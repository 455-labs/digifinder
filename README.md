# DigiFinder

DigiFinder is a frontend web application that allows users to search for information about Digimon using an external [Digimon API](https://digi-api.com/).

## Table of Contents

- [DigiFinder](#digifinder)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [About](#about)
  - [Features](#features)
  - [Install Instructions](#install-instructions)
    - [Prerequisites](#prerequisites)
    - [Run development server](#run-development-server)
    - [Build for production](#build-for-production)
  - [Authors](#authors)

## Description

DigiFinder is a Vue 3–based frontend application built to demonstrate modern component-based UI development, API integration, and state management.

The application allows users to search Digimon by name or ID, browse results, mark favorites, and view detailed Digimon information in a responsive and accessible interface.

## About

This application was developed as part of a frontend application development course at **Tampere University of Applied Sciences (TAMK)**.

The goal of the course was to introduce students to selected modern frontend (browser-based) application development techniques and practices, and to train them in their practical use. The course aimed to provide students with strong foundations for building non-trivial frontend applications using modern tools and frameworks.

Another important objective of the course was to learn how to use **AI tools as part of the software development process**. AI tools were actively used in the creation of this project, including supporting code development, problem-solving, and documentation.

## Features

- Search Digimon by name or ID
- Random Digimon generator
- Detailed Digimon information view
- Favorite Digimon system (stored in localStorage)
- Previous / Next navigation between Digimon
- Light and dark themes
- Multi-language support (English & Finnish)
- Responsive design for desktop and mobile
- Accessible UI with validated contrast ratios
- Toast notifications and dialogs for user feedback

## Install Instructions

### Prerequisites

- Node.js (recommended LTS version)
- npm or yarn

### Run development server

```bash
git clone https://github.com/455-labs/digifinder
cd digifinder
npm install
npm run dev
```

The app will be available at:
`http://localhost:5173`

### Build for production

For building the project for production, refer to the [official Vue documentation](https://vuejs.org/guide/best-practices/production-deployment.html).

## Authors

This project was developed by:

- Helmi Haapasaari
- Pirjo Keskinen
- Samu Kouhia
- Vera Uusitalo
- Ilkka Wahala
