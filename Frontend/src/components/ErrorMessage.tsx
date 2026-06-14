interface ErrorMessageProps {
    message: string;
}

// הודעת שגיאה אחידה לכל המסכים.
function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="panel status-panel error-panel">
            <p>{message}</p>
        </div>
    );
}

export default ErrorMessage;