"use client";

import Link from "next/link";
import { Card } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { CardContent } from "@/components/dashboard/Card";
import { PageTitle, AnalyticLineChart } from "@/components/dashboard";
import { CardItem } from "@/components/dashboard/";
import { useState, useCallback } from "react";

interface Props {
  name: string;
  email: string;
  amount: string;
}

const SalesData: Props[] = [
  { name: "Timetable One", email: "annie@gmail.com", amount: "12/Jan/2024" },
  { name: "Timetable One", email: "maggie@gmail.com", amount: "12/Jan/2024" },
  { name: "Timetable Two", email: "george@gmail.com", amount: "12/Jan/2024" },
  { name: "Timetable Three", email: "coco@gmail.com", amount: "12/Jan/2024" },
  { name: "Timetable Four", email: "boo@gmail.com", amount: "12/Jan/2024" },
  { name: "Timetable Five", email: "sasha@gmail.com", amount: "12/Jan/2024" },
];

export default function Page() {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      if (uploadedFile.name.endsWith(".xlsx")) {
        setFile(uploadedFile);
      } else {
        alert("Only .xlsx files are allowed!");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": []
    },
    multiple: false, // Allow only one file
  });


  return (
    <div className="flex flex-col gap-5 w-full mt-12">
      <PageTitle title="Dashboard" />

      {/* File Upload Area */}
      <div className="mb-6">
        <Card
          {...getRootProps()}
          className="w-full p-8 border-dashed border-2 cursor-pointer hover:border-primary transition-colors"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <Upload className="h-10 w-10" />
            {isDragActive ? (
              <p>Drop the file here ...</p>
            ) : (
              <>
                <p className="font-medium">Drag & drop a .xlsx file here, or click to select</p>
                <p className="text-sm">Only one .xlsx file is allowed</p>
              </>
            )}
            {file && (
              <div className="mt-4">
                <p className="font-medium text-foreground">Selected file:</p>
                <p>{file.name}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 transition-all">
        <CardContent>
          <section>
            <p className="font-semibold">Generated Timetables</p>
            <p className="text-gray-500 text-sm">
              You have generated {SalesData.length} timetables so far
            </p>
            {SalesData.map((d, i) => (
              <CardItem
                key={i}
                accountName={d.name}
                email={d.email}
                amount={d.amount}
                username="Colin"
                description="Some description"
              />
            ))}
            <Link className="flex justify-end text-blue-400" href="#">
              See all
            </Link>
          </section>
        </CardContent>
        <AnalyticLineChart />
      </section>
    </div>
  );
}
