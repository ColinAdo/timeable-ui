import Link from "next/link";
import { ChangeEvent } from "react";

interface Props {
  labeId: string;
  type: string;
  value: string;
  link?: {
    linkText: string;
    linkUrl: string;
  };
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  required?: boolean;
}

export default function Input({
  labeId,
  type,
  value,
  link,
  onChange,
  children,
  required = false,
}: Props) {
  return (
    <div>
      <div className="flex justify-between align-center">
        <label
          htmlFor={labeId}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {children}
        </label>

        {link && (
          <div className="text-sm">
            <Link
              className="text-indigo-800 hover:text-indigo-600 font-medium"
              href={link.linkUrl}
            >
              {link.linkText}
            </Link>
          </div>
        )}
      </div>
      <div className="mt-2">
        <input
          id={labeId}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          name={labeId}
          type={type}
          onChange={onChange}
          value={value}
          required={required}
        />
      </div>
    </div>
  );
}
