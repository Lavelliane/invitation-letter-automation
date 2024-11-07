import dayjs from "dayjs";
export default function generatePDFTemplate(data) {
    // Parse the date strings
    const birthDate = dayjs(data.birthDate, 'DD-MMM-YYYY');
    
    // Extract year, month, day from addedTime
    const year = dayjs().format('YYYY');
    const month = dayjs().format('MM');
    const day = dayjs().format('DD');
    
    // Extract birth year, month, day
    const birthYear = birthDate.format('YYYY');
    const birthMonth = birthDate.format('MM');
    const birthDay = birthDate.format('DD');

    const paperTitle = data['titleOfPresentation/paper/poster(ifApplicable)']
    return {
        // Header Section
        Text: year,                                    // Year
        Text1: month,                                  // Month
        Text26: day,                                  // Day
        AmbassadorConsulGeneralofJapanin: `${data.nationality.charAt(0).toUpperCase() + (data.nationality.toLowerCase()).slice(1)}`,    // Country of Applicant (hardcoded as form is for Japan embassy in Korea)

        // Inviting Person Information
        Text2: "SeongHan Shin",                         // Full Name of inviting person
        Text3: "",                                     // Postal Code - Left side of dash
        Text4: "",                                     // Postal Code - Right side of dash
        Text5: "",                                     // Address Long
        Text6: "",                                     // Phone number (country code)
        Text7: "",                                     // Phone number - area code
        Text8: "",                                     // Phone number - main
        Text9: "",                                     // Phone number extension

        // Company Information (if company is inviting)
        Text10: "",                                    // Full name if company is inviting
        Text11: "",                                    // Company Phone (country code)
        Text12: "",                                    // Company Phone - area code
        Text13: "",                                    // Company Phone - main
        Text14: "",                                    // Company Phone extension
        DepartmentDivision: "",                        // Department/Division

        // Visa Applicant Information
        Text15: `${data.firstName} ${data.lastName}`,  // Applicant's FULL name
        'Check Box2': data.sex === 'Male',            // Male checkbox
        Female: data.sex === 'Female',                // Female checkbox
        Text16: "0",                                  // Number of additional applicants
        Text17: birthYear,                            // Year of Birth
        Text18: birthMonth,                           // Month of Birth
        Text19: birthDay,                             // Day of Birth
        Text20: data.ageOfBirth,                      // Age
        Text21: data.nationality.charAt(0).toUpperCase() + (data.nationality.toLowerCase()).slice(1),                     // Nationality
        Text22: data.occupation,                      // Occupation

        // Purpose and Background
        Text23: `To invite the ${data.type} of the paper titled "${paperTitle}" to attend and present their work at the MobiSec 2024 8th International Conference in Sapporo, Japan.`, // Purpose of Invitation
        Text24: `The ${data.type} has been invited to present their research, titled “${paperTitle}” which aligns with MobiSec 2024’s focus on advancements in mobile security.`,   // Background to invitation
        Text25: "Participant Chair to Conference Participant"              // Relationship with visa applicant
    };
}