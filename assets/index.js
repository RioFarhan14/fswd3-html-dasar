    function openclose() {
        const a = document.getElementById('arrow')
        const b = document.querySelector('nav')
        let checklist = document.getElementById('checklist')
        if (checklist.checked == true) {
            document.getElementById('open').style.display="none"
            document.getElementById('close').style.display="block"
            a.classList.add('open-arrow')
            b.classList.add('open-nav')
        } else {
            document.getElementById('close').style.display="none"
            document.getElementById('open').style.display="block"
            a.classList.remove('open-arrow')
            b.classList.remove('open-nav')
        }
      };
