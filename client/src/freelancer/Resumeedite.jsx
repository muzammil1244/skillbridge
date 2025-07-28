import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from 'html2canvas-pro';
import { jsPDF } from "jspdf";

export const Resume = () => {
  const pdfRef = useRef(null);
  const location = useLocation();
  const [pdfMode, setPdfMode] = useState(false); // for cleaner layout during PDF
const userdata= location.state?.getprofile
  
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState([{ id: null, course: "", college: "", year: "" }]);
  const [projects, setProjects] = useState([
    { id: null, title: "", description: "", link: "" },
  ]);
  const [certifications, setCertifications] = useState([{ id: null, course: "", provider: "", year: "" }]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);

  const handleDownloadPDF = async () => {
    setPdfMode(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // wait for DOM to apply class

    const el = pdfRef.current;
    const canvas = await html2canvas(el, { scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "px", format: "a4" });
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(img, "PNG", 0, 0, w, h);
    pdf.save("resume.pdf");

    setPdfMode(false);
  };

  return (
    <div className={`w-full min-h-screen bg-white dark:bg-black text-black dark:text-white`}>
      <div
        ref={pdfRef}
        className={`mx-auto max-w-[800px] p-6 ${pdfMode ? "bg-white text-black" : "bg-white dark:bg-bg-dark shadow-lg rounded-xl"}`}
      >

        {/* Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold text-purple-600">{userdata.name}</h1>
          <p className="text-sm">{userdata.email} </p>
        </div>

        {/* Summary */}
        <Section title="Professional Summary">
          {pdfMode ? (
            <p className="text-sm">{summary}</p>
          ) : (
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full mt-2 p-2 border rounded"
            />
          )}
        </Section>

        {/* Education */}
        <Section title="Education">
          {education.map((item, index) => (
            <div key={item.id} className="mb-2">
              {pdfMode ? (
                <>
                  <p className="font-medium text-sm">{item.course} - {item.college}</p>
                  <p className="text-xs text-gray-600">Year: {item.year}</p>
                </>
              ) : (
                <>
                  <input value={item.course} onChange={(e) => update(education, index, "course", e.target.value, setEducation)} className="w-full border p-1 mb-1" />
                  <input value={item.college} onChange={(e) => update(education, index, "college", e.target.value, setEducation)} className="w-full border p-1 mb-1" />
                  <input value={item.year} onChange={(e) => update(education, index, "year", e.target.value, setEducation)} className="w-full border p-1 mb-1" />
                </>
              )}
            </div>
          ))}
        </Section>

        {/* Projects */}
        <Section title="Projects">
          {projects.map((item, index) => (
            <div key={item.id} className="mb-2">
              {pdfMode ? (
                <>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs">{item.description}</p>
                  <a className="text-xs text-blue-600">{item.link}</a>
                </>
              ) : (
                <>
                  <input value={item.title} onChange={(e) => update(projects, index, "title", e.target.value, setProjects)} className="w-full border p-1 mb-1" />
                  <input value={item.description} onChange={(e) => update(projects, index, "description", e.target.value, setProjects)} className="w-full border p-1 mb-1" />
                  <input value={item.link} onChange={(e) => update(projects, index, "link", e.target.value, setProjects)} className="w-full border p-1 mb-1" />
                </>
              )}
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section title="Skills">
          {pdfMode ? (
            <p className="text-sm">{skills.join(", ")}</p>
          ) : (
            <textarea
              value={skills.join(", ")}
              onChange={(e) => setSkills(e.target.value.split(",").map(s => s.trim()))}
              className="w-full p-2 border"
            />
          )}
        </Section>

        {/* Languages */}
        <Section title="Languages">
          {pdfMode ? (
            <p className="text-sm">{languages.join(", ")}</p>
          ) : (
            <textarea
              value={languages.join(", ")}
              onChange={(e) => setLanguages(e.target.value.split(",").map(s => s.trim()))}
              className="w-full p-2 border"
            />
          )}
        </Section>

        {!pdfMode && (
          <div className="text-center mt-6">
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
            >
              Download as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Section Component
const Section = ({ title, children }) => (
  <div className="mt-6">
    <h2 className="text-lg font-semibold border-b pb-1 mb-2">{title}</h2>
    {children}
  </div>
);

// Utility Update Function
const update = (arr, index, key, val, setter) => {
  const copy = [...arr];
  copy[index][key] = val;
  setter(copy);
};
