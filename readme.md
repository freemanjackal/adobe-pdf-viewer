# SDK Adobe PDF Viewer
The project front end is built with ReactJs located in the client folder. The back end use Node to serve the built html page from React and to serve a pdf file through the /file url.

## Serve project from Node
Download the code and move to the pdf-viewer(or what ever you called the directory when downloaded) folder in the cli. Assuming Node is installed(otherwise check this out), the next step is to  install project dependencies through 'npm install'.
Once installed run 'node index.js'. That will start an express server and application will be available at 3000 port.
the back end is already using the built page created in React. 

### Pdf files are served from the pdfs directory

## Front end changes
I you would like to make changes to the way the page looks and modify functionalities go to the client directory and run
npm install to install all react dependencies and some other third party components used. With yarn start or npm start you launch the client project. Take into account that it consumes from the backend service on port 3000 to get the pdf file, so you should first initiate the backend server.

Once you are done with your modifications, build the project with, yarn build.

## Google analytics
The events that are lsitened and recorded in GA are:
DOCUMENT_OPEN
DOCUMENT_DOWNLOAD
PAGE_VIEW
TEXT_COPY

For it to work you need to specify the tag code in the .env file.

## env variables
Google analytics tag code and the SDK client id need to be changed in the .env file, create one or modify the name .env.sample and just substitute the values.

REACT_APP_GA_TAG= your ga
REACT_APP_CLIENT_ID= your client id
