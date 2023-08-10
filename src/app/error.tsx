"use client";

import EmptyState from "@/components/EmptyState";
import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}

const error = ({ error }: ErrorStateProps) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title="Un Oh!" subtitle="Something went wrong!" />;
};

export default error;
