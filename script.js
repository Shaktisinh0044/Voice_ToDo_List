 if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      let taskinput = document.querySelector("#taskinput");
      let taskList = document.querySelector("#taskList");

      // Start recognition on input focus
      taskinput.addEventListener("focus", () => {
        recognition.start();
      });

      // Get voice input
      recognition.onresult = (event) => {
        let translate = event.results[0][0].transcript;
        taskinput.value = translate;
        addTask();
      };

      // Stop recognition when done
      recognition.onend = () => {
        recognition.stop();
      };

      // Handle recognition errors
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      // Add task to list
      function addTask() {
        let taskText = taskinput.value.trim();
        if (taskText !== '') {
          let taskitem = document.createElement("li");
          taskitem.innerHTML = `<span>${taskText}</span> <button onclick="deleteTask(this)" class="deleteBtn">Delete</button>`;
          taskList.appendChild(taskitem);
          taskinput.value = "";
        }
      }

      // Delete task
      window.deleteTask = function (btn) {
        let liParent = btn.parentNode;
        taskList.removeChild(liParent);
      };
    } else {
      alert("Your browser doesn't support Speech Recognition.");
    }