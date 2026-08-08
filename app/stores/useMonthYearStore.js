import { defineStore } from 'pinia';
import dayjs from 'dayjs';

export const useMonthYearStore = defineStore('month-year', () => {
    
    const month = ref(dayjs().month() +1);
    const year = ref(dayjs().year());

    return { month, year };
})