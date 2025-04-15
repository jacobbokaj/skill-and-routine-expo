export default interface SkillData {
    data: {
        name: string;
        totalTime: number;
        streak: number;
        TimeInfo: {
            date: string;
            time: number;
        }[];
    }
}