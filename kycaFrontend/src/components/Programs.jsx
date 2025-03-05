import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";

const programs = [
  {
    name: "Regular Program (Five or Seven Days a Week)",
    description:
      "• Annual: ₹45,000 + 18% GST = ₹53,100<br/>• Six Months: ₹25,000 + 18% GST = ₹29,500<br/>• Three Months: ₹12,500 + 18% GST = ₹14,750",
    href: "#",
  },
  {
    name: "Weekend Program or any 2 days of the week",
    description:
      "• Annual: ₹30,000 + 18% GST = ₹35,400<br/>• Six Months: ₹16,000 + 18% GST = ₹18,880<br/>• Three Months: ₹9,000 + 18% GST = ₹10,620",
    href: "#",
  },
  {
    name: "Three Days a Week Program",
    description:
      "• Annual: ₹35,000 + 18% GST = ₹41,300<br/>• Six Months: ₹18,500 + 18% GST = ₹21,830<br/>• Three Months: ₹10,000 + 18% GST = ₹11,800",
    href: "#",
  },
  {
    name: "Special Benefit for Annual Members",
    description: "• 2 session ₹10,000<br/>• 20% off",
    href: "#",
  },
];

export default function Programs() {
  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <div className="bg-gray-50 py-12 sm:py-16 lg:py-20" id="programs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="text-center" id="ourPrograms">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Programs
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Choose the program that best fits you
          </p>
        </section>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.name}
              onClick={() => setSelectedProgram(program)}
              className="relative cursor-pointer rounded-lg bg-white p-8 shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {program.name}
              </h3>
              <Link
                to={program.href}
                className="mt-6 inline-flex items-center text-emerald-600 hover:text-emerald-700"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedProgram.name}
            </h3>
            <p
              className="mt-4 text-gray-600"
              dangerouslySetInnerHTML={{ __html: selectedProgram.description }}
            ></p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}