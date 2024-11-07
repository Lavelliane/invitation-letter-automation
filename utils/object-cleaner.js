export default function cleanObject(obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        let cleanKey = key.trim();
        
        // Handle special cases
        if (cleanKey.includes('Full Name')) {
            cleanKey = 'fullName';
        } else if (cleanKey === 'Participant Type') {
            cleanKey = 'type';
        } else if (cleanKey === 'Date of Birth') {
            cleanKey = 'birthDate';
        } else {
            // Convert to camelCase
            cleanKey = cleanKey.split(' ')
                .map((word, index) => {
                    if (index === 0) return word.toLowerCase();
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                })
                .join('');
        }
        
        if (cleanKey === 'fullName' && typeof value === 'string') {
            const [firstName, lastName] = value.split(',').map(name => name.trim());
            acc.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            acc.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
        } else {
            acc[cleanKey] = typeof value === 'string' ? value.trim() : value;
        }
        return acc;
    }, {});
}