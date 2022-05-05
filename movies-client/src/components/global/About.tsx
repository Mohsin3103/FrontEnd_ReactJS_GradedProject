import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCode } from '@fortawesome/free-solid-svg-icons';

const About = () => {
    return (
        <main>
            <section>
                <header className="my-5">
                    <h2>
                        <FontAwesomeIcon icon={faCode} className="me-2" />
                        Tech Stack
                    </h2>
                    <hr />
                </header>
                <p>
                    The frontend app (this one) was scaffolded using <a href="https://create-react-app.dev/docs/getting-started">Create React App</a>, and built with <a href="https://reactjs.org">React</a>, <a href="https://reactrouter.com/web/guides/quick-start">React Router (v.5.1.6)</a>, and <a href="https://react-bootstrap.github.io/">React Bootstrap</a> (which in turn uses <a href="https://getbootstrap.com/">Bootstrap</a>). <a href="https://www.typescriptlang.org/docs/handbook/intro.html">Typescript</a> is the language of choice. The backend is built using <a href="https://github.com/typicode/json-server">json-server</a>. The icons used have been courtesy <a href="https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react">Font Awesome</a>.
                </p>
            </section>
        </main>
    )
};

export default About;