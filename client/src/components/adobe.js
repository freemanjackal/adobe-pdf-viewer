/*
Copyright 2020 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

import ReactGA from 'react-ga';



class ViewSDKClient {
    constructor() {
        this.readyPromise = new Promise((resolve) => {
            if (window.AdobeDC) {
                resolve();
            } else {
                /* Wait for Adobe Document Cloud View SDK to be ready */
                document.addEventListener("adobe_dc_view_sdk.ready", () => {
                    resolve();
                });
            }
        });
        this.adobeDCView = undefined;
        //ReactGA.initialize('UA-171552738-1');

        ReactGA.initialize(process.env.REACT_APP_GA_TAG);

    }

    ready() {
        return this.readyPromise;
    }

    previewFile(divId, viewerConfig) {
        const config = {
            /* Pass your registered client id */
            //clientId: "fa4dd3e9f22b44b8b3c3144565899e62",
            clientId: process.env.REACT_APP_CLIENT_ID
            //clientId: client_id
        };
        if (divId) { /* Optional only for Light Box embed mode */
            /* Pass the div id in which PDF should be rendered */
            config.divId = divId;
        }
        /* Initialize the AdobeDC View object */
        this.adobeDCView = new window.AdobeDC.View(config);

        /* Invoke the file preview API on Adobe DC View object */
        const previewFilePromise = this.adobeDCView.previewFile({
            /* Pass information on how to access the file */
            content: {
                /* Location of file where it is hosted */
                location: {
                    //url: "https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf",
                    url: "http://localhost:8000/file",
                    
                    //If the file URL requires some additional headers, then it can be passed as follows:-
                    headers: [
                        {
                            key: "Access-Control-Allow-Origin",
                            value: "*",
                        }
                    ]
                    
                },
            },
            /* Pass meta data of file */
            metaData: {
                /* file name */
                fileName: "fileName",
                id: "1",
            }
            
        }, viewerConfig);

        return previewFilePromise;
    }

    previewFileUsingFilePromise(divId, filePromise, fileName) {
        /* Initialize the AdobeDC View object */
        this.adobeDCView = new window.AdobeDC.View({
            /* Pass your registered client id */
            clientId: process.env.REACT_APP_CLIENT_ID,
            /* Pass the div id in which PDF should be rendered */
            divId,
        });

        /* Invoke the file preview API on Adobe DC View object */
        this.adobeDCView.previewFile({
            /* Pass information on how to access the file */
            content: {
                /* pass file promise which resolve to arrayBuffer */
                promise: filePromise,
            },
            /* Pass meta data of file */
            metaData: {
                /* file name */
                fileName: fileName
            }
        }, {});
    }

    registerSaveApiHandler() {
        /* Define Save API Handler */
        const saveApiHandler = (metaData, content, options) => {
            console.log(metaData, content, options);
            return new Promise(resolve => {
                /* Dummy implementation of Save API, replace with your business logic */
                setTimeout(() => {
                    const response = {
                        code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
                        data: {
                            metaData: Object.assign(metaData, {updatedAt: new Date().getTime()})
                        },
                    };
                    resolve(response);
                }, 2000);
            });
        };

        this.adobeDCView.registerCallback(
            window.AdobeDC.View.Enum.CallbackType.SAVE_API,
            saveApiHandler,
            {}
        );
    }

    registerEventsHandler() {
        /* Register the callback to receive the events */
        this.adobeDCView.registerCallback(
            /* Type of call back */
            window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
            /* call back function */
            //TODO: change to switch structure
            event => {
                    if(event.type === "DOCUMENT_OPEN"){
                        console.log(event.data.fileName);
                        ReactGA.event({
                                      category: 'PDF_Viewer',
                                      action: 'DOCUMENT_OPEN',
                                      label: event.data.fileName
                                    });

                    }
                    if(event.type === "DOCUMENT_DOWNLOAD"){
                        ReactGA.event({
                                      category: 'PDF_Viewer',
                                      action: 'DOCUMENT_DOWNLOAD',
                                      label: event.data.fileName
                                    });

                    }
                    if(event.type === "PAGE_VIEW"){
                        ReactGA.event({
                                      category: 'PDF_Viewer',
                                      action: 'PAGE_VIEW',
                                      label: event.data.fileName+"_"+event.data.pageNumber
                                    });
                    }
                    if(event.type === "TEXT_COPY"){

                        ReactGA.event({
                                      category: 'PDF_Viewer',
                                      action: 'TEXT_COPY',
                                      label: event.data.fileName+"_"+event.data.copiedText
                                    });
                    }
            },
            /* options to control the callback execution */
            {
                /* Enable PDF analytics events on user interaction. */
                enablePDFAnalytics: true,
            }
        );
    }
}

export default ViewSDKClient;