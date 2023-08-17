"use client";

import PageHeader from "@/components/layout/page-header";
import BackButton from "@/components/layout/back-button";
import { Input } from "@/components/ui/input";
import { Frown, Search } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import useSwr from "swr";
import { fetchData } from "@/lib/utils";
import type { SearchExerciseAPIResponse, FetchError } from "@/types";
import { useDebounce } from "@/hooks/use-debounce";
import ExerciseList from "@/components/exercise-list";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

const fetcher = async (url: string) => await fetchData(url);

export default function PageContent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword);

  const { data, isLoading } = useSwr<SearchExerciseAPIResponse, FetchError>(
    debouncedKeyword.trim() !== "" ? `/api/exercises/search/?q=${debouncedKeyword}` : null,
    fetcher
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <PageHeader backButton={<BackButton href="/" />}>
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-500 absolute top-1/2 -translate-y-1/2 left-3" />
          <Input
            type="search"
            ref={inputRef}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search"
            className="pl-9 focus:border-slate-300 focus-visible:ring-0 focus-visible:ring-transparent"
          />
        </div>
      </PageHeader>

      <section className="container px-4 py-16 relative">
        {isLoading && (
          <div className="absolute inset-0 flex justify-center pt-28">
            <Spinner variant="primary" size="lg" className="duration-700" />
          </div>
        )}

        {data !== undefined && data.total_count > 0 && (
          <>
            <h1 className="text-lg text-slate-800 font-semibold mt-2 mb-4">Best Match</h1>
            <ExerciseList data={data.suggestions} />
          </>
        )}

        {keyword !== "" && data !== undefined && data.total_count === 0 && (
          <div className="absolute inset-0 pt-28">
            <Alert
              icon={<Frown className="w-20 h-20 text-slate-500" />}
              title="Exercises not found"
              description="Please use other search keywords."
              ctaButton={
                <Button
                  onClick={() => {
                    setKeyword("");
                    inputRef.current?.focus();
                  }}
                  variant="primary"
                  className="mt-4"
                >
                  Change Keywords
                </Button>
              }
            />
          </div>
        )}
      </section>
    </>
  );
}
