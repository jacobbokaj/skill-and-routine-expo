export default interface SkillData {
    data: {
        name: string;
        totalTime: number;
        streak: number;
        TimeInfo: {
            dato: string;
            time: number;
        }[];
    }
}