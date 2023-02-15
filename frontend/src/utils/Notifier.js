export default class Notifier {
    constructor(snackbar) {
        this.snackbar = snackbar;
    }

    internalNotify(message, severity) {
        this.snackbar(message, {variant:severity})
    }
    success = (message) => this.internalNotify(message, "success")
    error = (message) => this.internalNotify(message, "error")
    warning = (message) => this.internalNotify(message, "warning")
    onRequestError = (message) => (response) => {
        if (response.status >= 400 && response.status < 600)
            this.error(message)
        return response;
    }
    onRequestSuccess = (message) => (response) => {
        if (response.status >= 200 && response.status < 300)
            this.success(message)
        return response;
    }

    connectionError = () => this.error("verificare la connessione");
}