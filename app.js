const data = {
    currentUser: {
      image: { 
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
    comments: [
      {
        parent:0,
        id: 1,
        content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: "1 month ago",
        score: 12,
        user: {
          image: { 
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp",
          },
          username: "amyrobson",
        },
        replies: []
      },
      {
        parent:0,
        id: 2,
        content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt: "2 weeks ago",
        score: 5,
        user: {
          image: { 
            png: "./images/avatars/image-maxblagun.png",
            webp: "./images/avatars/image-maxblagun.webp",
          },
          username: "maxblagun",
        },
        replies: [
          {
            parent:2,
            id: 1,
            content: 
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            createdAt: "1 week ago",
            score: 4,
            replyingTo: "maxblagun",
            user: {
              image: { 
                png: "./images/avatars/image-ramsesmiron.png",
                webp: "./images/avatars/image-ramsesmiron.webp",
              },
              username: "ramsesmiron",
            }
          },
          {
            parent: 2,
            id: 1,
            content: 
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            createdAt: "2 days ago",
            score: 2,
            replyingTo: "ramsesmiron",
            user: {
              image: { 
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp",
              },
              username: "juliusomo",
            },
          },
        ],
      },
    ],
  };


  document.addEventListener('DOMContentLoaded', function() {
  function appendFragment(frag, parent) {
    let children = Array.from(frag.childNodes);
    children.forEach(child => {
      parent.appendChild(child);
    });
    return children.find(node => node.nodeType === Node.ELEMENT_NODE);
  }
 
  
  
  
  
      const addComment = (body, parentId,replyTo = undefined) => {
      let commentParent =parentId === 0 ? data.comments: data.comments.filter((c) => c.id == parentId)[0].replies;
      let newComment = {
      parent: parentId,
      id: commentParent.length ==0 ? 1 : commentParent[commentParent.length - 1].id + 1,
      content: body,
      createdAt: "Now",
      replyingTo: replyTo,
      score: 0,
      replies: parent == 0 ? [] : undefined,
      user: data.currentUser,
  }
  commentParent.push(newComment);
  initComments()
  }
 /*  const deleteComment = (commentObject) => {
      if(commentObject.parent == 0){
          data.comments = data.comments.filter((e) => e != commentObject);
      }else{
          data.comments.filter((e) => e.id === commentObject.parent)[0].replies = data.comments.filter((e) => e.id ==commentObject.parent)[0].replies.filter((e)=>e!=commentObject);
      }
      initComments()
  } */
  const deleteComment = (commentObject) => {
    if (commentObject.parent === 0) {
      data.comments = data.comments.filter((comment) => comment !== commentObject);
    } else {
      const parentComment = data.comments.find((comment) => comment.id === commentObject.parent);
      if (parentComment && parentComment.replies) {
        parentComment.replies = parentComment.replies.filter((reply) => reply !== commentObject);
      }
    }
  
    const commentWrps = document.querySelectorAll('.comment-wrp');
    commentWrps.forEach((commentWrp) => {
      if (commentWrp.dataset.commentId === commentObject.id.toString()) {
        commentWrp.remove();
      }
    });
  
    initComments();
  };
  
  
  const promptDel = (commentObject) => {
      const modalwrp = document.querySelector('.modal-wrp');
      modalwrp.classList.remove('invisible');
      modalwrp.querySelector('.yes').addEventListener('click',()=>{
          deleteComment(commentObject);
          modalwrp.classList.add('invisible');
      });
      modalwrp.querySelector('.no').addEventListener('click',()=>{
          modalwrp.classList.add('invisible');
      });
  }
  const spawnReplyInput = (parent, parentId, replyTo = undefined) => {
    const existingInputs = parent.querySelectorAll('.reply-input');
    if (existingInputs.length > 0) {
      existingInputs.forEach((input) => {
        input.remove();
      });
    }
  
    // Rest of the function code...
  
    const replyInputTemplate = document.querySelector('.reply-input-template');
    if (replyInputTemplate && parent) {
      const replyInputContent = replyInputTemplate.content;
      const replyInputNode = replyInputContent.querySelector('.reply-input-container');
      const addedReplyInput = parent.appendChild(replyInputNode.cloneNode(true));
  
      const btnPrimary = addedReplyInput.querySelector('.butn-primary');
      if (btnPrimary) {
        btnPrimary.addEventListener('click', () => {
          let commentBody = addedReplyInput.querySelector('.cmnt-input').value;
          if (commentBody.length === 0) return;
          addComment(commentBody, parentId, replyTo);
          addedReplyInput.remove(); // Remove the reply input after adding the comment
        });
      } else {
        console.error("Button with class 'butn-primary' not found in the cloned reply input template.");
      }
    } else {
      console.error("Either the reply input template or the parent element was not found.");
    }
  };
  
/*   const spawnReplyInput = (parent, parentId, replyTo = undefined) => {
    const existingInputs = parent.querySelectorAll('.reply-input');
    if (existingInputs.length > 0) {
      existingInputs.forEach((input) => {
        input.remove();
      });
    }
  } */



/* document.addEventListener('DOMContentLoaded', () => {
  const inputTemplate = document.querySelector('.reply-input-template');


  if (inputTemplate && parent) {
    const inputContent = inputTemplate.content;
    const inputNode = inputContent.querySelector('.reply-input-container');
    const addedInput = parent.appendChild(inputNode.cloneNode(true));
    const btnPrimary = addedInput.querySelector('.butn-primary');
    if (btnPrimary) {
      btnPrimary.addEventListener('click', () => {
        let commentBody = addedInput.querySelector('.cmnt-input').value;
        if (commentBody.length === 0) return;
        addComment(commentBody, parentId, replyTo);
        addedInput.remove();
        console.log(inputTemplate);
      });
    } else {
      console.error("Button with class 'butn-primary' not found in the cloned input template.");
    }
  } else {
    console.error("Either the input template or the parent element was not found.");
  }
}); */



  
  const createCommentNode = (commentObject) => {
      const commentTemplate = document.querySelector('.comment-template');
      let commentNode = commentTemplate.content.cloneNode(true);
      commentNode.querySelector('.usr-name').textContent = commentObject.user.username;
      commentNode.querySelector('.usr-img').src = commentObject.user.image.webp;
      commentNode.querySelector('.score-number').textContent = commentObject.score;
      commentNode.querySelector('.cmt-at').textContent = commentObject.createdAt;
      commentNode.querySelector('.c-body').textContent = commentObject.content;
      if(commentObject.replyingTo){
          commentNode.querySelector('.reply-to').textContent = '@' + commentObject.replyingTo;
          commentNode.querySelector('.score-plus').addEventListener('click', ()=>{
              commentObject.score++;
              initComments();
          })
          commentNode.querySelector('.score-minus').addEventListener('click', ()=>{
              commentObject.score--;
              if(commentObject.score < 0) commentObject.score = 0;
              initComments();
          });
          if (commentObject.user.username == data.currentUser.username) {
              commentNode.querySelector('.comment-wrp').classList.add('this-user');
              commentNode.querySelector('.delete').addEventListener('click', ()=>{
                  promptDel(commentObject)
              })
              commentNode.querySelector('.edit').addEventListener('click', (e)=>{
                  const path = e.path(3).querySelector('.c-body');
                  if(path.getAttribute('contenteditable') == false || path.getAttribute('contenteditable') == null){
                      path.setAttribute('contenteditable',true);
                      path.focus();
                  }else{
                      path.removeAttribute('contenteditable');
                  }
              })
              return commentNode;
          }
      }return commentNode;
  }


  const appendComment = (parentNode, commentNode, parentId) => {
    const bu_reply = commentNode.querySelector('.reply');
    const appendedCmnt = appendFragment(commentNode, parentNode);
    console.log('appendedCmnt:', appendedCmnt);
    const replyTo = appendedCmnt.querySelector('.usr-name').textContent;
    console.log('replyTo:', replyTo);
    if (bu_reply) {
      console.log('bu_reply exists');
      bu_reply.addEventListener('click', () => {
        if (parentNode.classList.contains('replies')) {
          console.log('spawn reply input in parent node');
          spawnReplyInput(parentNode, parentId, replyTo);
        } else {
          console.log('spawn reply input in appended comment node');
          spawnReplyInput(appendedCmnt.querySelector('.replies'), parentId, replyTo);
        }
      });
    } else {
      console.error("Button with class 'control-icon.reply' not found in the comment template.");
    }
  };
  
  
  
  function initComments(commentList = data.comments, parent = document.querySelector('.comments-wrp')) {
    parent.innerHTML = "";
    commentList.forEach((element) => {
      var parentId = element.parent == 0 ? element.id : element.parent;
      const comment_node = createCommentNode(element);
      if (element.replies && element.replies.length > 0) {
        initComments(element.replies, comment_node.querySelector('.replies'));
      }
      appendComment(parent, comment_node, parentId);
    });
  }
  
  initComments();

  
  /* const cmntinput = document.querySelector('.reply-input');
  cmntinput.querySelector('.butn-primary').addEventListener('click', () => {
    let commentBody = cmntinput.querySelector('.cmt-input').value;
    if (commentBody.length === 0) return;
    addComment(commentBody, 0);
    cmntinput.querySelector('.cmt-input').value = '';
  }); */
 /*  const cmntinput = document.querySelector('.reply-input');
cmntinput.querySelector('.butn-primary').addEventListener('click', () => {
  let commentBody = cmntinput.querySelector('.cmt-input').value;
  if (commentBody.length === 0) return;
  addComment(commentBody, 0);
  cmntinput.querySelector('.cmt-input').value = '';

  // Find the newly added comment node
  const commentNode = document.querySelector('.comment-wrp:last-child');
  if (commentNode) {
    // Check if the comment's user matches the current user
    if (commentNode.querySelector('.usr-name').textContent === data.currentUser.username) {
      commentNode.classList.add('this-user');
      commentNode.querySelector('.delete').addEventListener('click', () => {
        promptDel(commentObject);
      });
      commentNode.querySelector('.edit').addEventListener('click', (e) => {
        const path = e.path[3].querySelector('.c-body');
        if (path.getAttribute('contenteditable') == false || path.getAttribute('contenteditable') == null) {
          path.setAttribute('contenteditable', true);
          path.focus();
        } else {
          path.removeAttribute('contenteditable');
        }
      });
      // Hide the reply icon
      commentNode.querySelector('.reply').style.display = 'none';
    }
  }
}); */
const cmntinput = document.querySelector('.reply-input');
cmntinput.querySelector('.butn-primary').addEventListener('click', () => {
  let commentBody = cmntinput.querySelector('.cmt-input').value;
  if (commentBody.length === 0) return;
  addComment(commentBody, 0);
  cmntinput.querySelector('.cmt-input').value = '';

  // Find the newly added comment node
  const commentsWrp = document.querySelector('.comments-wrp');
  const commentNode = commentsWrp.lastElementChild;
  if (commentNode) {
    // Check if the comment's user matches the current user
    if (commentNode.querySelector('.usr-name').textContent === data.currentUser.username) {
      commentNode.classList.add('this-user');
      commentNode.querySelector('.delete').addEventListener('click', () => {
        promptDel(commentNode);
      });
      commentNode.querySelector('.edit').addEventListener('click', (e) => {
        const path = e.target.closest('.comment-wrp').querySelector('.c-body');
        if (path.getAttribute('contenteditable') == false || path.getAttribute('contenteditable') == null) {
          path.setAttribute('contenteditable', true);
          path.focus();
        } else {
          path.removeAttribute('contenteditable');
        }
      });
      // Hide the reply icon
      commentNode.querySelector('.reply').style.display = 'none';
    }
  }
});



});

  
  

   