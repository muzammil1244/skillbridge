import { PermanentJobIcon, BorderFullIcon, BubbleChatOutcomeIcon, StarIcon, ArrowLeft02Icon, Message01Icon, UserStatusIcon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Applications = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [applicants, setApplicants] = useState([]);

    const location = useLocation()


    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

    const filteredApplicants = applicants.filter((applicant) => {
        const matchName = applicant.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchStatus =
            statusFilter === "all" || applicant.status === statusFilter;
        return matchName && matchStatus;
    });

  
    const navigate = useNavigate()

    console.log("themmm", location.state)

    useEffect(() => {
        applicationdata()
    }, [])

    // application data 
    const jobId = location?.state?.jobid
    const senderId = location?.state?.senderId
    const applicationdata = async () => {
        const token = localStorage.getItem("token")

        try {
            const data = await fetch(`https://skillbridge-x62a.onrender.com/api/employer/${jobId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }

            })

            const json = await data.json();
            console.log(json); // Add this to check structure

            setApplicants(json.applicants); // ✅ Use correct key
        } catch (err) {

            console.log(err)
        }




    }

    console.log(filteredApplicants)

    
    const handleStatusChange = async (index, newStatus) => {
    const updated = [...applicants];
    const freelancerId = updated[index].freelancerId;
    const jobId = location.state?.jobid;
    const token = localStorage.getItem("token");

    // Optimistic update (UI pe turant dikhao)
    updated[index].status = newStatus;
    setApplicants(updated);
    setActiveDropdownIndex(null);

    try {
        const response = await fetch(`https://skillbridge-x62a.onrender.com/api/update-status/${jobId}/${freelancerId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
        });

        const result = await response.json();
        console.log("Status updated response:", result);
    } catch (error) {
        console.log("Status update failed", error);
    }
};



    return (
        <div data-theme={`${location.state?.themtrue ? "dark" : ""}`} className="min-h-screen dark:bg-bg-dark bg-white text-gray-800 dark:text-text-color p-6">
            <div className="bg-purple-500 overflow-x-hidden dark:bg-accent-color text-white dark:text-text-color px-2 md:px-6 py-4 rounded-lg shadow mb-6 flex justify-between items-center">
                <div className="flex md:gap-5 gap-1 items-center">
                 <ArrowLeft02Icon onClick={() => {
                        navigate("/employer/home")
                    }}  className="hover:scale-120 duration-200  md:size-[25px] size-[19px]" />
                    <h1 className="md:text-2xl text-sm font-bold">Job Applications</h1>
                    <BorderFullIcon className=" md:size-[25px] size-[19px]  " />
                    <span className="font-black">{applicants.length}</span>
                </div>
                <div className="flex md:gap-5 gap-2 justify-between items-center">
                    <PermanentJobIcon className=" md:size-[25px] size-[19px]" />
                    <span className="text-md text-[10px]">Backend Developer</span>
                </div>
            </div>

            <div className="mb-6 flex flex-col md:flex-row gap-2 md:gap-4">
                <input
                    type="text"
                    placeholder="Search applicant by name..."
                    className="w-full md:w-1/2 p-3 border dark:bg-card-color dark:border-border-color border-purple-300 rounded-lg focus:outline-none focus:ring-2 dark:focus:ring-accent-color focus:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full md:w-1/4 p-3 dark:bg-card-color  border dark:border-border-color border-purple-300 rounded-lg focus:outline-none focus:ring-2 dark:focus:ring-accent-color focus:ring-purple-500"
                >
                    <option className=" dark:bg-card-color dark:text-secondary-text-color" value="all">All Status</option>
                    <option className=" dark:bg-card-color dark:text-secondary-text-color" value="pending">Pending</option>
                    <option className=" dark:bg-card-color dark:text-secondary-text-color" value="accepted">Accepted</option>
                    <option className=" dark:bg-card-color dark:text-secondary-text-color" value="rejected">Rejected</option>
                </select>
            </div>

            {/* Applicants List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApplicants.map((applicant, index) => (
                    <div
                        key={index}
                        className=" hover:scale-102 duration-200   dark:bg-card-color bg-purple-50 border dark:border-border-color border-purple-200 rounded-xl p-4 shadow hover:shadow-lg transition"
                    >
                        <div className="flex items-center mb-4 gap-4">
                            <img
                                src={`https://skillbridge-x62a.onrender.com/uploads/${applicant.profileImage}`}
                                alt={applicant.name}
                                className="w-16 h-16 rounded-full object-cover border-2 dark:border-secondary-text-color border-purple-400"
                            />

                            <div>
                                <h2 className="text-lg font-bold text-purple-700 dark:text-text-color capitalize">
                                    {applicant.name}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-secondary-text-color">{applicant.email}</p>
                            </div>
                        </div>

                        <p className="text-sm mb-2">
                            <span className="font-semibold text-gray-700 dark:text-text-color"> Letter:</span>{" "}
                            {applicant.coverLater}
                        </p>

                        <div className="mb-2 flex  gap-2">
                            <span className=" flex gap-2 font-semibold dark:text-text-color text-gray-700"> <UserStatusIcon /> Status: </span>
                            {activeDropdownIndex === index ? (
                                <select
                                    className="border dark:border-border-color border-purple-300 rounded p-1 text-sm"
                                    value={applicant.status}
                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>

                                </select>
                            ) : (
                                <span
                                    onClick={() => setActiveDropdownIndex(index)}
                                    className="text-purple-600 dark:text-accent-color cursor-pointer underline"
                                >
                                    {applicant.status}
                                </span>
                            )}
                        </div>

                        <p className="text-sm mb-2 flex gap-2 items-center">
                            <span className="font-semibold text-gray-700 dark:text-text-color">Rating:</span>{" "}
                            {applicant.rating} <StarIcon className="text-orange-500 font-extrabold" size={15} color="orange" />
                        </p>
                        <p className="text-sm mb-4 ">
                            <span className="font-semibold dark:text-secondary-text-color text-gray-700">Applied At:</span>{" "}
                            {new Date(applicant.appliedAt).toLocaleString()}
                        </p>

                        <div className="flex flex-row-reverse justify-around">
                            <a
                                href={`http://localhost:5000/uploads/${applicant.resume}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" dark:shadow shadow-[3px 6px 5px 15px] dark: hover:shadow-white block text-center dark:bg-accent-light bg-purple-600 dark:hover:bg-accent-color hover:bg-purple-700  text-white font-semibold py-2 px-4 rounded-lg">
                                View Resume
                            </a>

                            <button onClick={()=>{

const reciverId = applicant
let conversationId = "new"
let jobid = jobId
let employertrue = true
                                navigate("/chatapp",{
                                    state:{senderId,reciverId,conversationId,jobid,employertrue}
                                })
                            }} className="flex gap-4 text-center justify-center items-center dark:hover:bg-accent-color hover:bg-purple-700 dark:bg-accent-light bg-blue-400 text-white px-4 py-2 font-semibold rounded-lg">
                                <BubbleChatOutcomeIcon size={25} />
                                start </button>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
};  