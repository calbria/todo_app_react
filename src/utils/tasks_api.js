import { NOTES_URL } from "../constants/url";

export const getFetcher = async (accessToken) => {
  
    try {
      const response = await fetch(
        `${NOTES_URL}?status=active%2Cdone`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      console.log(response);
      if (!response.ok) {
        console.log(
          "Status: ",
          response.status,
          "Message: ",
          response.statusText
        );
      } else {
        const body = await response.json();
       
        return body;
      }
     
    } catch (err) {
      console.log(err.message);
    }
  };

  export const postFetcher = async (newTask, accessToken) => {
    try {
      const response = await fetch(NOTES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(newTask),
      });
      console.log(response);
      if (!response.ok) {
        console.log(
          "Status: ",
          response.status,
          "Message: ",
          response.statusText
        );
        
      } else {
        
        console.log("Task aded");
        
        
      }
    } catch (err) {
      console.log(err.message);
      
    }
  }

  export const putFetcher = async (task, accessToken) => {
    try {
      const response = await fetch(
        `${NOTES_URL}/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            text: task.text,
            status: task.status,
          }),
        }
      );
      console.log(response);
      if (!response.ok) {
        console.log(
          "Status: ",
          response.status,
          "Message: ",
          response.statusText
        );
      } else console.log("Task changed");
    } catch (err) {
      console.log(err.message);
    }
  };