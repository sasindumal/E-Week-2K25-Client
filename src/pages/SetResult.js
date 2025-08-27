import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SetResult.css";

const SetResult = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const location = useLocation();
    const navigate = useNavigate();
    const eventId = location.state?.eventId || "";

    const options = ["E21", "E22", "E23", "E24", "Staff"];

    const [event, setEvent] = useState({});
    const [formData, setFormData] = useState({
        winners: "",
        firstRunnerUp: "",
        secondRunnerUp: "",
        thirdRunnerUp: "",
        status: "finished",
    });

    const [secondFormData, setSecondFormData] = useState({
        eventId: eventId,
        eventName: "",
        E22Rank: "",
        E23Rank: "",
        E24Rank: "",
        E21Rank: "",
        StaffRank: "",
        E22Score: "",
        E23Score: "",
        E24Score: "",
        E21Score: "",
        StaffScore: "",
    });

    const [loading, setLoading] = useState(false);

    // Fetch event data
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/createEvents/getEventsById`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ eventId }),
                });
                if (!response.ok) throw new Error("Failed to fetch event details");
                const data = await response.json();
                setEvent(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEvent();
    }, [eventId]);

    // Handle dropdown change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Check for duplicates
    const hasDuplicates = () => {
        const selections = [
            formData.winners,
            formData.firstRunnerUp,
            formData.secondRunnerUp,
            formData.thirdRunnerUp,
        ].filter(Boolean);
        return new Set(selections).size !== selections.length;
    };

    // Prepare secondFormData with scores and ranks
    useEffect(() => {
        if (!event.pointsConfiguration) return;

        const positions = ["winners", "firstRunnerUp", "secondRunnerUp", "thirdRunnerUp"];
        const scores = event.pointsConfiguration;

        const updated = {
            eventId: eventId,
            eventName: event.title || "",
            E22Rank: "",
            E23Rank: "",
            E24Rank: "",
            E21Rank: "",
            StaffRank: "",
            E22Score: "",
            E23Score: "",
            E24Score: "",
            E21Score: "",
            StaffScore: "",
        };

        positions.forEach((pos, idx) => {
            const team = formData[pos] || event[pos];
            if (team && options.includes(team)) {
                updated[`${team}Rank`] = pos;
                updated[`${team}Score`] = scores[idx];
            }
        });

        setSecondFormData(updated);
    }, [event, eventId, formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate selections
        const invalidSelection = ["winners", "firstRunnerUp", "secondRunnerUp", "thirdRunnerUp"].some(
            (key) => !options.includes(formData[key])
        );
        if (invalidSelection) {
            alert("Please select valid participants for all positions.");
            return;
        }

        if (hasDuplicates()) {
            alert("Please select different participants for each position.");
            return;
        }

        try {
            setLoading(true);

            const filteredFormData = Object.fromEntries(
                Object.entries(formData).filter(([_, v]) => v)
            );

            // Update event
            const res = await fetch(`${BASE_URL}/api/createEvents/terminateEvent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventId, ...filteredFormData }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to set result");
            }

            // Update leaderboard
            const lbRes = await fetch(`${BASE_URL}/api/LeaderBoard/addEventResult`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(secondFormData),
            });

            if (!lbRes.ok) {
                const lbErrorData = await lbRes.json();
                throw new Error(lbErrorData.message || "Failed to update leaderboard");
            }

            alert("Result successfully saved!");
            navigate(-1);
        } catch (err) {
            console.error(err);
            alert("Error saving result: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="set-result-page">
            <h1 className="page-title">Set Event Result</h1>

            <form onSubmit={handleSubmit} className="result-form">
                {["winners", "firstRunnerUp", "secondRunnerUp", "thirdRunnerUp"].map((pos) => (
                    <label key={pos}>
                        {pos.replace(/([A-Z])/g, " $1")}:{" "}
                        <select name={pos} value={formData[pos]} onChange={handleChange} required>
                            <option value="">Select {pos.replace(/([A-Z])/g, " $1")}</option>
                            {options.map((opt) => (
                                <option
                                    key={opt}
                                    value={opt}
                                    disabled={Object.values(formData).includes(opt) && formData[pos] !== opt}
                                >
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </label>
                ))}

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Results"}
                </button>
            </form>
        </div>
    );
};

export default SetResult;