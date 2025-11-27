import { Webhook } from "svix";
import { headers } from "next/headers";
import { currentUser, WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/prisma";

export async function syncUserToDatabase() {
  const clerkUser = await currentUser();
  
  if (clerkUser) {
    await prisma.user.upsert({
      where: { id: clerkUser.id },
      update: {
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        username: clerkUser.username || clerkUser.id,
        displayName: clerkUser.firstName && clerkUser.lastName 
          ? `${clerkUser.firstName} ${clerkUser.lastName}` 
          : clerkUser.username || "User",
        img: clerkUser.imageUrl, // PENTING: Simpan imageUrl dari Clerk
        updatedAt: new Date(),
      },
      create: {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        username: clerkUser.username || clerkUser.id,
        displayName: clerkUser.firstName && clerkUser.lastName 
          ? `${clerkUser.firstName} ${clerkUser.lastName}` 
          : clerkUser.username || "User",
        img: clerkUser.imageUrl, // PENTING: Simpan imageUrl dari Clerk
      },
    });
  }
}

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const wh = new Webhook(SIGNING_SECRET);
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);

  if (eventType === "user.created") {
    try {
      const parsedBody = JSON.parse(body);
      
      await prisma.user.create({
        data: {
          id: evt.data.id,
          username: parsedBody.data.username || parsedBody.data.id,
          email: parsedBody.data.email_addresses[0].email_address,
          displayName: parsedBody.data.first_name && parsedBody.data.last_name
            ? `${parsedBody.data.first_name} ${parsedBody.data.last_name}`
            : parsedBody.data.username || "User",
          img: parsedBody.data.image_url || "", // ✅ PERBAIKAN: ambil dari data.image_url
        },
      });
      
      console.log("User created with image:", parsedBody.data.image_url);
      return new Response("User created", { status: 200 });
    } catch (err) {
      console.error("Failed to create user:", err);
      return new Response("Error: Failed to create a user!", {
        status: 500,
      });
    }
  }

  // Tambahkan handler untuk user.updated agar foto bisa diupdate
  if (eventType === "user.updated") {
    try {
      const parsedBody = JSON.parse(body);
      
      await prisma.user.update({
        where: { id: evt.data.id },
        data: {
          username: parsedBody.data.username || parsedBody.data.id,
          email: parsedBody.data.email_addresses[0].email_address,
          displayName: parsedBody.data.first_name && parsedBody.data.last_name
            ? `${parsedBody.data.first_name} ${parsedBody.data.last_name}`
            : parsedBody.data.username || "User",
          img: parsedBody.data.image_url || "", // ✅ Update foto juga
        },
      });
      
      console.log("User updated with image:", parsedBody.data.image_url);
      return new Response("User updated", { status: 200 });
    } catch (err) {
      console.error("Failed to update user:", err);
      return new Response("Error: Failed to update user!", {
        status: 500,
      });
    }
  }

  if (eventType === "user.deleted") {
    try {
      await prisma.user.delete({ where: { id: evt.data.id } });
      return new Response("User deleted", { status: 200 });
    } catch (err) {
      console.error("Failed to delete user:", err);
      return new Response("Error: Failed to delete user!", {
        status: 500,
      });
    }
  }

  return new Response("Webhook received", { status: 200 });
}