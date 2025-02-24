import { Input } from "@/components/forms";
import { Spinner } from "@/components/common";
import { ChangeEvent, FormEvent } from "react";

interface Config {
  type: string;
  value: string;
  labelId: string;
  labelText: string;
  link?: {
    linkText: string;
    linkUrl: string;
  };
  required?: boolean;
}

interface Props {
  isLoading: boolean;
  btnText: string;
  config: Config[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
export default function Form({
  isLoading,
  btnText,
  config,
  onChange,
  onSubmit,
}: Props) {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {config.map((input) => (
        <Input
          link={input.link}
          key={input.labelId}
          labeId={input.labelId}
          onChange={onChange}
          type={input.type}
          value={input.value}
          required={input.required}
        >
          {input.labelText}
        </Input>
      ))}

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={isLoading}
        >
          {isLoading ? <Spinner sm /> : `${btnText}`}
        </button>
      </div>
    </form>
  );
}
