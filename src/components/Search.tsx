"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { searchUsers } from "@/actions";
import Link from "next/link";

// Inline debounce hook untuk menghindari masalah import
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface SearchResult {
  id: string;
  username: string;
  displayName: string | null;
  img: string | null;
  bio: string | null;
  _count: {
    followers: number;
  };
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedQuery.trim().length === 0) {
        setResults([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const users = await searchUsers(debouncedQuery);
        setResults(users);
        setShowResults(true);
      } catch (err) {
        console.error("Search failed:", err);
        setError("Failed to search users");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="bg-gray-100 py-2 px-4 items-center gap-4 rounded-full flex">
        <Image
          src="/icons/explore.svg"
          width={16}
          height={16}
          alt="search"
        />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none placeholder:text-gray-500 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setShowResults(true)}
        />
      </div>

      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Searching...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              {error}
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((user) => (
                <Link
                  key={user.id}
                  href={`/${user.username}`}
                  onClick={() => {
                    setShowResults(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 transition"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                    {user.img ? (
                      <Image
                        src={user.img}
                        alt={user.username}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                        {user.username[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold truncate">
                      {user.displayName || user.username}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      @{user.username}
                    </div>
                    {user.bio && (
                      <div className="text-sm text-gray-600 truncate">
                        {user.bio}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 flex-shrink-0">
                    {user._count.followers} followers
                  </div>
                </Link>
              ))}
            </div>
          ) : query.trim().length > 0 ? (
            <div className="p-4 text-center text-gray-500">
              No users found
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Search;