import styles from "../../assets/css_modules/chatBot.module.css"

export default function ChatButton({ setChatOpen, isOpen }) {
    return (
        <button
            onClick={() => setChatOpen(!isOpen)}
            className={styles.chatbot_button}
        >
            <i className="fa-regular fa-comment-dots"></i>
        </button>
    )
}


