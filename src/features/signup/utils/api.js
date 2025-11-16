
const mockBasicInfo = {
    nationality: '日本',
    residenceCountry: '日本',
    lastName: '山田',
    firstName: '太郎',
    gender: 'male',
    birthMonth: '1990-01'
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchBasicInfo() {
    await delay(600);

    return { ...mockBasicInfo };
}