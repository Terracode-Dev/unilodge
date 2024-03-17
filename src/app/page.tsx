import Image from "next/image";
import Student from "@/app/student/Studentm";
import Studentb from "./student/Studentb";

export default function Home() {
  return <div className="grid grid-cols-7 gap-2 "><Student/>
  <Studentb/></div>
}
