import { GraduationCap } from "lucide-react";
import { PasswordResetConfirmForm } from "@/components/forms";

interface Props {
  params: {
    uid: string;
    token: string;
  };
}

// export default function Page() {
//   return (
//     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-0">
//         <GraduationCap className="mx-auto h-10 w-auto" />
//         <h2 className="mt-1 text-center dark:text-white text-2xl font-mono font-bold leading-9 tracking-tight text-gray-900">
//           Timeable
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <PasswordResetConfirmForm uid={uid} token={token} />
//       </div>
//     </div>
//   );
// }

export default function Page({ params: { uid, token } }: Props) {
  return (
    <main className="min-h-screen justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-0">
        <GraduationCap className="mx-auto text-white h-10 w-auto" />
        <h2 className="mt-1 text-center text-2xl text-white font-mono font-bold leading-9 tracking-tight">
          Timeable
        </h2>
      </div>
      <div className="relative z-10 mx-auto flex justify-center">
        <PasswordResetConfirmForm uid={uid} token={token} />
      </div>
    </main>
  )
}