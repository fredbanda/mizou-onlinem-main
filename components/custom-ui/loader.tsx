import { PropagateLoader } from "react-spinners";
export const  Loader= () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <PropagateLoader color="#03adfc" aria-label="Loading..." className="bg-sky-700" />
    </div>
  )
}
