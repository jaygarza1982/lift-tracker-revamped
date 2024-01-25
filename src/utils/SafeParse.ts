
export default <T>(JSONString: string): T | undefined => {
    try {
        return JSON.parse(JSONString);
    } catch (error) {
        return undefined;
    }
}
