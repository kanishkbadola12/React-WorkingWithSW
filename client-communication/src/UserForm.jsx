import classes from './UserForm.module.css';

const UserForm = () => {

    const submitHandler = async (event) => {
        const data = new FormData(event.target);
        const formObj = Object.fromEntries(data);

        navigator.serviceWorker.controller.postMessage(formObj);
        event.preventDefault();
    };

    return (
        <form onSubmit={submitHandler}>
            <p>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" required />
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input id="image" type="url" name="image" required />
            </p>
            <p>
                <label htmlFor="date">Date</label>
                <input id="date" type="date" name="date" required />
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows="5" required />
            </p>
            <div className={classes['footer-action']}>
                <button type="button">
                    Cancel
                </button>
                <button>Save</button>
            </div>
        </form>
    );
}

export default UserForm;