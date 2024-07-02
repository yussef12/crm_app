export const dateMixin = {

    methods: {
        formatDateString(dateString) {
            const date = new Date(dateString);

            const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZone: "UTC"
            };

            const formattedDate = date.toLocaleDateString("en-US", options) + " " + date.toLocaleTimeString("en-US", options);

            return formattedDate;
        },
    }
};