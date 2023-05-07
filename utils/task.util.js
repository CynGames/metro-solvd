module.exports = {
    calculateTrainIntervals: (timePeriods) => {
        const passengerFlow = {
            morning: 1000,
            lunch: 500,
            evening: 5000,
        };

        const convertTimeStringToDate = (timeString) => {
            const [hours, minutes] = timeString.split(':').map(Number);
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date;
        };

        const trainCapacity = 6 * 50;

        return timePeriods.map((period) => {
            const { name, start_time: startTimeStr, end_time: endTimeStr } = period;

            const startTime = convertTimeStringToDate(startTimeStr);
            const endTime = convertTimeStringToDate(endTimeStr);

            // Calculate the number of hours in the time period, accounting for overnight periods
            let timePeriodHours;
            if (endTime >= startTime) {
                // eslint-disable-next-line max-len
                timePeriodHours = (endTime.getHours() - startTime.getHours()) + ((endTime.getMinutes() - startTime.getMinutes()) / 60);
            } else {
                // eslint-disable-next-line max-len
                timePeriodHours = (24 - startTime.getHours() + endTime.getHours()) + ((endTime.getMinutes() - startTime.getMinutes()) / 60);
            }

            // Calculate the number of trains required based on the passenger flow data
            const trainsRequired = Math.ceil(passengerFlow[name] / trainCapacity);

            // Calculate the train interval for the time period
            const interval = (timePeriodHours * 60) / trainsRequired;

            // interval number rounded up to nearest 2 decimal places
            const roundedInterval = Math.ceil(interval * 100) / 100;

            return {
                'Time Period': name,
                'Time Interval Between Trains': `${roundedInterval} minutes`,
            };
        });
    },
    getTimePeriods: async (pool) => {
        const result = await pool.query('SELECT * FROM time_periods');
        return result.rows;
    },
};
