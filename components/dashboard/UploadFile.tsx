import { Upload } from "lucide-react";
import { Card } from '@/components/ui/card';
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUploadFileMutation } from "@/redux/features/timtableSlice";
import { FormEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Spinner } from "@/components/common";

export default function UploadFile() {
    const router = useRouter();
    const [uploadFile, { isLoading }] = useUploadFileMutation();
    const [file, setFile] = useState<File | null>(null);
    const [batchId] = useState(`timetable_${Math.floor(100000000 + Math.random() * 900000000)}`);

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
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
        },
        multiple: false,
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            toast.error("No file selected!");
            return;
        }

        const formData = new FormData();
        formData.append("batchId", batchId);
        formData.append("file", file);

        uploadFile({ batchId, file })
            .unwrap()
            .then(() => {
                toast.success("File uploaded successfully");
                router.push(`/dashboard/create/timetable?batchId=${batchId}`);
            })
            .catch(() => {
                toast.error("Failed to upload!");
            });
    };

    return (
        <div className="mb-6">
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="batch_id" value={batchId} />
                <Card
                    {...getRootProps()}
                    className="w-full bg-black/[0.96] bg-grid-white/[0.02] p-8 border-dashed border-2 border-purple-300 cursor-pointer hover:border-purple-400 transition-colors"
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

                {/* Centered Submit Button, only visible if file is selected */}
                {file && (
                    <div className="flex justify-center mt-4">
                        <Button className="flex justify-center mt-4 bg-gradient-to-r from-purple-500 rounded to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                            {isLoading ? <Spinner sm /> : "Upload"}
                        </Button>
                    </div>
                )}
            </form>
        </div>
    )
}