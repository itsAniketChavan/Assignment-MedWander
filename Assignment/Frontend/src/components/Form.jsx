import { useState } from "react";
import { toast } from "react-toastify";

// Define regex patterns for phone numbers by country code
const phoneNumberPatterns = {
    "+1": /^\d{10}$/, // US: 10 digits
    "+91": /^\d{10}$/, // India: 10 digits
    "+44": /^(\d{5}|\d{10})$/, // UK: 5 or 10 digits
    "+61": /^\d{9}$/ // Australia: 9 digits
};

function isValidPhoneNumber(phoneNumber, countryCode) {
    const pattern = phoneNumberPatterns[countryCode];
    if (pattern) {
        return pattern.test(phoneNumber) ? "true" : "false";
    }
    return "false";
}

export default function Form({ formType }) {
    const [name, setName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errors, setErrors] = useState({});

    const countryCodes = ["+1", "+91", "+44", "+61"];

    const validateForm = () => {
        const newErrors = {};

        if (!name.match(/^[A-Za-z\s]+$/)) {
            newErrors.name = "Name must contain only alphabetic characters and spaces";
        }
        if (!countryCode) {
            newErrors.countryCode = "Please select a country code";
        }
        // Validate phone number using country code
        if (isValidPhoneNumber(phoneNumber, countryCode) === "false") {
            newErrors.phoneNumber = "Phone number must be valid for the selected country code";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (setter, value, field) => {
        setter(value);

        if (field === "name" && value.match(/^[A-Za-z\s]*$/)) {
            setErrors((prevErrors) => ({ ...prevErrors, name: undefined }));
        }
        if (field === "countryCode" && value) {
            setErrors((prevErrors) => ({ ...prevErrors, countryCode: undefined }));
        }
        if (field === "phoneNumber") {
            // Validate on each change
            if (isValidPhoneNumber(value, countryCode) === "true") {
                setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: undefined }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const formattedPhoneNumber = `${countryCode}${phoneNumber}`;

                const response = await fetch("http://localhost:3000/addSampleUsers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        form_type: formType,
                        name,
                        country_code: countryCode,
                        phone_no: formattedPhoneNumber, // Send as text
                    }),
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                toast.success("Form Submitted Successfully");
                console.log("Server response:", data);

                // Clear all fields
                setName("");
                setCountryCode("");
                setPhoneNumber("");
                setErrors({});
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
                toast.error("Form submission failed");
            }
        }
    };

    // Synchronize handler for the new button
    const handleSynchronize = async () => {
        try {
            const response = await fetch("http://localhost:3000/data-synchronizing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
               
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // const data = await response.json();
            toast.success("Synchronization Successful");
            // console.log("Synchronization response:", data);
        } catch (error) {
            console.error("There was a problem with the synchronization operation:", error);
            toast.error("Synchronization failed");
        }
    };

    return (
        <div className="w-full max-w-xs mx-auto bg-white p-5 rounded shadow-md">
            <h2 className="text-2xl mb-5 font-bold">{`Form ${formType}`}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => handleChange(setName, e.target.value, "name")}
                        className="w-full border border-gray-300 p-2 rounded mt-1"
                        placeholder="Enter your name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1" role="alert" aria-live="assertive">
                            {errors.name}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium">Country Code</label>
                    <select
                        value={countryCode}
                        onChange={(e) => handleChange(setCountryCode, e.target.value, "countryCode")}
                        className="w-full border border-gray-300 p-2 rounded mt-1"
                    >
                        <option value="">Select a country code</option>
                        {countryCodes.map((code) => (
                            <option key={code} value={code}>
                                {code}
                            </option>
                        ))}
                    </select>
                    {errors.countryCode && (
                        <p className="text-red-500 text-sm mt-1" role="alert" aria-live="assertive">
                            {errors.countryCode}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium">Phone Number</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => handleChange(setPhoneNumber, e.target.value, "phoneNumber")}
                        className="w-full border border-gray-300 p-2 rounded mt-1"
                        placeholder="Enter your phone number"
                    />
                    {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1" role="alert" aria-live="assertive">
                            {errors.phoneNumber}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

            {/* Synchronize button */}
            <button
                onClick={handleSynchronize}
                className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600"
            >
                Synchronize
            </button>
        </div>
    );
}
