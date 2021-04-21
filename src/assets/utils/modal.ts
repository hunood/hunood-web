import { Modal as AntModal } from 'antd';

class Modal {
    static async openTimerModal(
        type: 'info' | 'error' | 'success' | 'warning',
        title: string,
        message: string,
        seconds: number = 60,
        onOk?: () => void,
        keyboard: boolean = true
    ) {
        let secondsToGo = seconds;
        AntModal.destroyAll();

        const modal = (AntModal as any)[type]({
            title: `${title}`,
            content: message,
            okText: `Ok (${secondsToGo})`,
            keyboard,
            onOk
        });

        const timer = setInterval(() => {
            secondsToGo -= 1;
            if (secondsToGo > 0) modal.update({
                okText: `Ok (${("0" + secondsToGo).slice(-2)})`
            });
        }, 10000);

        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
        }, secondsToGo * 1000);
    }
}

export { Modal };