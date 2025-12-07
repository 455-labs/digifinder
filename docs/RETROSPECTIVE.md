# RETROSPECTIVE

**DigiFinder** was developed as part of the Frontend App Development course in the Degree Programme in Business Information Systems at Tampere University of Applied Sciences.

The primary goal of the course was to explore modern frontend development techniques and apply them in a practical project.

The application was created collaboratively by Helmi Haapasaari, Pirjo Keskinen, Samu Kouhia, Vera Uusitalo and Ilkka Wahala.

## Table of Contents

- [RETROSPECTIVE](#retrospective)
  - [Table of Contents](#table-of-contents)
  - [Core Idea](#core-idea)
  - [Choosing the Framework](#choosing-the-framework)
  - [Visual Design](#visual-design)
  - [Usability and Accessibility](#usability-and-accessibility)
    - [Possible Usability and Accessibility Improvements](#possible-usability-and-accessibility-improvements)
  - [Security](#security)
    - [Possible Security Improvements](#possible-security-improvements)
  - [Experimental and Planned Features Not Included in the Final Version](#experimental-and-planned-features-not-included-in-the-final-version)
  - [Issues Encountered](#issues-encountered)
  - [Future Development](#future-development)
  - [Conclusion](#conclusion)

## Core Idea

As part of the course requirements, the application had to utilize an external API.

Our original plan was to use the [PokéAPI](https://pokeapi.co/), but after realizing that many other groups had selected the same interface, we decided to differentiate our project by choosing the [DigiAPI](https://digi-api.com/) instead.

The core idea of the application is to allow the user to search for and view detailed information about any Digimon using our custom interface.

## Choosing the Framework

Another requirement of the course was to build the application using a modern frontend framework.
At first, the group assumed that we would choose **React**, primarily because of its popularity in the job market and its wide industry adoption.

However, before starting the actual project, we conducted small experiments using **React**, **Angular**, and **Vue**.
After testing all three, the group ultimately chose **Vue**, mainly because of its simplicity, its gentle learning curve, and the fact that it is not backed by a large corporation—unlike **React** (**Meta**) and **Angular** (**Google**).

Additionally, **Angular** felt unnecessarily heavy and complex for the scale and requirements of this project.

The group compared the strengths and weaknesses of each framework before making the final decision: [FRAMEWORKS.md](./FRAMEWORKS.md)

## Visual Design

The visual style of the app is intentionally retro, with a color theme inspired by the classic Digimon logo. The layout of the `DisplayDigimon.vue` component was designed to resemble the appearance of the original Digimon virtual pet device.

![Photo of Digital Monster Virtual Pet Device](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Digimon_Mini.jpg/2560px-Digimon_Mini.jpg)

## Usability and Accessibility

Throughout the development process, we aimed to consider both usability and accessibility to ensure that the application is comfortable and intuitive for a wide range of users.

A [Contrast Checker](https://webaim.org/resources/contrastchecker/) tool was used to verify that the color combinations provide sufficient contrast and meet accessibility guidelines.

The application is fully responsive, adapting smoothly to different screen sizes. On mobile devices, a hamburger menu replaces the desktop navigation, and buttons are positioned to maintain ergonomic ease of use.

Images in the application include descriptive alt attributes, ensuring that screen readers can convey information to visually impaired users.

Additionally, the app includes a “**How to Use**” section, which guides users through the key features and explains how to interact with the interface effectively.

In addition to visual and structural considerations, the application provides clear error messages in the search field. These messages help guide the user when the input is invalid - for example, when the Digimon name is too short, or an ID is outside the allowed range. This improves usability by giving immediate feedback and helps prevent user frustration.

### Possible Usability and Accessibility Improvements

Due to the limited timeframe of the course, we were not able to implement usability and accessibility features to the level we originally intended. Several enhancements could further improve the overall user experience:

- **Improve keyboard navigation**, ensuring that all interactive elements can be accessed and activated without a mouse.
- **Add ARIA labels and roles** where appropriate to enhance clarity for users relying on screen readers.
- **Provide clearer focus indicators**, making it easier for keyboard users to track their position within the interface.

## Security

Throughout the development process, we aimed to keep application security in mind.

One of the design decisions was to choose an API that does not require authentication keys, reducing the risk of exposing sensitive credentials.

**DigiFinder** stores user settings and favorite Digimons in the browser’s **localStorage**, but no sensitive or personal information is saved.

Input validation was implemented in the search bar to restrict user input and prevent invalid or malicious queries. Additionally, the search input is built using a Vuetify component, which inherently prevents direct injection of scripts or other unsafe content.

### Possible Security Improvements

Even though **DigiFinder** does not handle sensitive information, applying these improvements would further increase the robustness, reliability, and security posture of the application if it were deployed in a real production environment.

- **Enable HTTPS on the production server**

  When the app is built and deployed, it should be served over HTTPS rather than plain HTTP.
  HTTPS encrypts all communication between the user’s browser and the server, preventing:

  - eavesdropping
  - data manipulation
  - man-in-the-middle attacks

  Today, HTTPS is considered the minimum security requirement for any publicly available web application.

  - **How HTTPS is typically enabled**

    Enabling HTTPS depends on the hosting environment, but the process is generally similar:

    1. Obtain an SSL/TLS certificate

        - Most projects use a free certificate from Let’s Encrypt.
        - Many hosting providers (**Vercel**, **Netlify**, **GitHub Pages**, **Firebase**, **Render**, etc.) offer automatic certificates with zero configuration.

    2. Configure the web server

        - If the app is hosted on a VPS or dedicated server, you configure HTTPS in a web server such as:

        - Nginx: using the ssl_certificate and ssl_certificate_key settings
        - Apache: using the SSLEngine on directive

    3. Force redirect from HTTP → HTTPS

        - Users accessing `http://example.com` are automatically redirected to `https://example.com`.

    4. Renew certificates automatically

        - Let’s Encrypt certificates expire every 90 days, so automatic renewal is recommended.

    Most modern hosting platforms automate all of this, so enabling HTTPS is usually as simple as turning on a toggle or it is enabled by default.

- **Implement rate limiting on API requests**

  If the application communicates with the DigiAPI through a backend proxy (in future development), rate limiting could:

  - prevent abuse
  - protect the API from overload
  - avoid denial-of-service style request floods

  Rate limiting is usually implemented server-side.

- **Audit and update dependencies regularly**

  Since the app uses **Vue**, **Vuetify**, **Axios**, and other libraries, outdated dependencies can introduce vulnerabilities.

  Tools like:

  - **npm audit**
  - **Snyk**
  - **GitHub Dependabot**
  
  can automatically detect and report known security issues.

## Experimental and Planned Features Not Included in the Final Version

Although the team successfully implemented most of the features planned for **DigiFinder**, a few experimental ideas did not make it into the final version due to time constraints.

- **Autocomplete**

    One of the features developed late in the project was an autocomplete function for the search bar, which would suggest possible Digimon names based on the user’s input. However, this feature introduced several issues that became too time-consuming to fix near the end of the course.

    The autocomplete system interfered with error handling, and the existing validation logic would have needed to be redesigned, since it would make little sense to allow invalid input if the application already knows all valid Digimon names. For these reasons, the feature was removed from the final presentation version.

- **Additional Color Themes**

    Some initial plans were made to include multiple color themes in the application. However, the team ultimately decided to limit the app to just two themes—light mode and dark mode. Designing additional themes would have required a significant amount of time, especially if each theme were to be properly tested and validated using a contrast checker to ensure accessibility compliance.

- **More Language Options**

    Additional language options were planned, and the corresponding JSON files were prepared in advance. However, the team did not have sufficient time to implement the necessary UI updates to fully support multiple additional languages beyond Finnish and English.

## Issues Encountered

The chosen API introduced several challenges during development.

First, the **DigiAPI** database contains inconsistencies and incorrect data. During testing, the team discovered that some Digimon names were misspelled, which caused unexpected search results and made validation more difficult.

The data provided by the API is also uneven in quality: not all Digimon entries include the same fields, and some images vary significantly in size. This inconsistency occasionally breaks the visual consistency of the **DigiFinder** interface, as certain Digimon images do not align with the intended layout.

Although the application was designed with the expectation that the API's database may be updated over time, various issues, such as empty or missing indexes, can still cause DigiFinder to behave unpredictably or fail to load certain entries properly.

## Future Development

Since the purpose of this course was to focus on frontend development, backend implementation will be explored in later courses. Nevertheless, **DigiFinder** could be expanded into a more complete full-stack application by introducing a backend where users could authenticate and manage their personal data. In such a scenario, user favorites and settings would no longer be stored in localStorage but safely saved on the server.

Introducing a backend would also require several important security considerations, such as:

- **Secure user authentication** (e.g., hashed passwords, token-based sessions)
- **Protection of user data** through proper authorization checks
- **Input validation and sanitization** on the server side
- **Rate limiting and request throttling**  to prevent abuse
- **HTTPS enforcement**  to protect data transmitted between client and server
- **Secure storage practices** , ensuring no sensitive data is stored in plaintext

The team also initially discussed adding a Digimon battle game mode, where users could battle using data retrieved from the **DigiAPI**. This concept was ultimately not implemented due to time constraints.

Instead, the group focused on implementing a wide range of modern UI features, such as dark mode and language selection, to explore typical patterns used in contemporary frontend applications.

## Conclusion

**DigiFinder** served as a valuable learning experience for the entire team, providing hands-on exposure to modern frontend development practices, component-based architecture, and collaborative software design. Despite the project’s time constraints, the team successfully implemented the majority of the planned features and produced a functional and visually distinctive application. The challenges encountered, such as inconsistent API data, framework comparisons, and evolving design decisions, offered meaningful insights into real-world development workflows.

There remains substantial room for future enhancements, from backend integration and improved accessibility to expanded features and language support. Nonetheless, the project achieved its core objectives and provided a solid foundation for further studies in both frontend and backend development. **DigiFinder** reflects not only what the team built, but also what they learned, experimented with, and discovered along the way.
