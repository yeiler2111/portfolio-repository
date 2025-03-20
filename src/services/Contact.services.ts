import { AxiosProvider } from "@/api/interceptor";
import { messageEmail } from "@/utils/emailMessage";
import { Contact } from "@/utils/interfaces";

export const ServicesContact = {
    async sendMessageContact(data: Contact) {
        try {
            const body = {
                sender: {
                    name: process.env.VUE_APP_SENDER || 'Default Sender Name',
                    email: process.env.VUE_APP_EMAIL_SENDER || 'default@sender.com',
                },
                to: [
                    {
                        email: data.email,
                        name: data.name,
                    },
                ],
                subject: data.affair,
                htmlContent: messageEmail(data.name),
            };

            const res = await AxiosProvider.useFactory().post('/smtp/email', body)
            debugger
            return res
        } catch (error) {
            console.log(error)
            return error
        }

    }
}