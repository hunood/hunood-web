import { Modal as AntModal } from 'antd';
import { config } from "config";

class Modal {
    static async openTimerModal(
        type: 'info' | 'error' | 'success' | 'warning',
        title: string,
        message: string,
        seconds: number = (config.timeoutModalGeneric / 1000),
        onOk?: () => void,
        keyboard: boolean = true
    ) {
        let secondsToGo = seconds;
        AntModal.destroyAll();

        const modal = (AntModal as any)[type]({
            title: `${title}`,
            content: message,
            okText: `Ok (${("0" + secondsToGo).slice(-2)})`,
            keyboard,
            onOk
        });

        const timer = setInterval(() => {
            secondsToGo -= 1;
            if (secondsToGo > 0) modal.update({
                okText: `Ok (${("0" + secondsToGo).slice(-2)})`
            });
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
        }, (secondsToGo) * 1000);
    }
}

export { Modal };