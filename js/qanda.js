M.AutoInit();

$.ajax({
    type: 'GET',
    url: './data/data.json',
    success: (data) => {
        let subjects = data.Subjects;
        let topics = data.Topics;
        let questions = data.Questions;
        subjOps(subjects, topics, questions);
    },
    error: (err) => {
        console.log(err);
    }
})

let subjOps = (subjects, topics, questions) => {
    let subjLen = subjects.length;
    subjects.forEach((subj, index) => {
        let col = (12 / subjLen);
        if(index == 0){
            
            $('#homeSubj').html('<a href="#" class="col l'+col+' btn getTopics" data-subjId="'+subj.id+'" data-subj="'+subj.subj+'">'+subj.subj+'</a>');
            
        } else {
            $('#homeSubj').append('<a href="#" class="col l'+col+' btn getTopics" data-subjId="'+subj.id+'" data-subj="'+subj.subj+'">'+subj.subj+'</a>');
            
        }

        $('.getTopics').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            let subjId = $(this).attr('data-subjId');
            let subjName = $(this).attr('data-subj');

            let thisSubjectTopics = topics.filter(function(topic){
                return topic.subjId == subjId;
            });

            $('#homeTopics').html('<div class="row"><h3 class="centre"></h3></div>');

            thisSubjectTopics.forEach((topic) => {
                $('#homeTopics').append('<div class="col l4"><a href="#" class="getQues" data-topicId="'+topic.id+'" data-topic="'+topic.topic+'">'+topic.topic+'</a></div>')
            });

            $('#homeTopics h3').html('<a class="waves-effect waves-light grey lighten-5 black-text btn-small left" id="toSubjects"><i class="material-icons left">arrow_back</i>back</a> '+subjName);

            $('#homeTopics').removeClass('hide');
            $('#homeSubj').addClass('hide');

            $('#toSubjects').on('click', function(e){
                $('#homeSubj').removeClass('hide');
                $('#homeTopics').addClass('hide');
            })


            $('.getQues').on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
    
                
                let topicId = $(this).attr('data-topicId');
                let topicName = $(this).attr('data-topic');
    
                let thisTopicsQuestions = questions.filter(function(ques){
                    return ques.topicId == topicId;
                });
                let quesLen = thisTopicsQuestions.length;

                $('#homeQues').html('<div class="row centre"><h3></h3><h4></h4></div>');

                thisTopicsQuestions.forEach((question, index) => {
                    let questionNum = index + 1;
                    
                    if(questionNum == 1){
                        $('#homeQues').append('<div class="col l12 active" id="'+questionNum+'"><p>Question '+questionNum+'</p><p><b>'+question.ques+'</b></p><div><p><label><input name="ques'+questionNum+'" type="radio" id="ques'+questionNum+'A" value="A"/><span><span class="black-text">A.</span> '+question.optA+'</span></label></p><p><label><input name="ques'+questionNum+'" type="radio" id="ques'+questionNum+'B" value="B"/><span><span class="black-text">B.</span> '+question.optB+'</span></label></p><p><label><input name="ques'+questionNum+'" type="radio" id="ques'+questionNum+'C" value="C"/><span><span class="black-text">C.</span> '+question.optC+'</span></label></p><p><label><input name="ques'+questionNum+'" type="radio" id="ques'+questionNum+'D" value="D"/><span><span class="black-text">D.</span> '+question.optD+'</span></label></p></div></div>');
                    } else {
                        $('#homeQues').append('<div class="col l12 question" id="'+questionNum+'"><p>Question '+questionNum+'</p><p><b>'+question.ques+'</b></p><div><p><label><input name="ques'+questionNum+'" type="radio" id="ques'+questionNum+'A" value="A"/><span><span class="black-text">A.</span> '+question.optA+'</span></label></p><p><label><input name="ques'+questionNum+'" type="radio" id="ques'+questionNum+'B" value="B"/><span><span class="black-text">B.</span> '+question.optB+'</span></label></p><p><label><input name="ques'+questionNum+'" type="radio" id="ques'+questionNum+'C" value="C"/><span><span class="black-text">C.</span> '+question.optC+'</span></label></p><p><label><input name="ques'+questionNum+'" type="radio" id="ques'+questionNum+'D" value="D"/><span><span class="black-text">D.</span> '+question.optD+'</span></label></p></div></div>');
                    }
                    
                });
                
                $('#homeQues').append('<div class="col l12 left"><a class="waves-effect waves-light btn" id="prevQues"><i class="material-icons left">arrow_back</i>Prev</a><a class="waves-effect waves-light btn right" id="nextQues"><i class="material-icons right">arrow_forward</i>Next</a></div>');

                $('#homeQues h3').html('<a class="waves-effect waves-light grey lighten-5 black-text btn-small left" id="toTopics"><i class="material-icons left">arrow_back</i>back</a> '+subjName+' <a class="waves-effect waves-light red btn-small right hide" id="submit"><i class="material-icons right">send</i>Submit</a>');
                $('#homeQues h4').html(topicName);

                $('#homeQues').removeClass('hide');
                $('#homeTopics').addClass('hide');

                $('#toTopics').on('click', function(e){
                    $('#homeTopics').removeClass('hide');
                    $('#homeQues').addClass('hide');
                });

                $('#nextQues').on('click', function(e){
                    e.preventDefault();
                    
                    let divId = $('.active').attr('id');
                    if(divId < quesLen){
                        $('#'+divId).removeClass('active').addClass('question');
                        $('#'+divId).next().removeClass('question').addClass('active');
                    }
                });

                $('#prevQues').on('click', function(e){
                    e.preventDefault();

                    let divId = $('.active').attr('id');
                    if(divId > 1){
                        $('#'+divId).removeClass('active').addClass('question');
                        $('#'+divId).prev().removeClass('question').addClass('active');
                    }
                });

                $('input[type="radio"]').on('change', function(e){
                    let radioName = $(this).attr('name');                    
                    let quesNumInString = radioName.substring(4, radioName.length);
                    let questionArrayPosition = parseInt(quesNumInString) - 1;
                    
                    let radioVal = $(this).val();
                    thisTopicsQuestions[questionArrayPosition]['userAns'] = radioVal;
                    checkAnsweredQuestions();
                });

                $('#submit').on('click', function(e){
                    e.preventDefault();
                    let correct = 0;
                    thisTopicsQuestions.forEach(q => {
                        if(q.ans == q.userAns){
                            correct += 1;
                        }
                    });

                    let percent = (correct / thisTopicsQuestions.length) * 100;

                    alert('Your score is '+percent+'%');
                })

                let checkAnsweredQuestions = () => {
                    let counter = 0;
                    thisTopicsQuestions.forEach(q => {
                        if(typeof q.userAns != 'undefined'){
                            counter += 1;
                        }
                    });

                    let percent = (counter / thisTopicsQuestions.length) * 100;
                    if(percent >= 80){
                        $('#submit').removeClass('hide');
                    }
                }
            });
        });
    });
}



//  TODO: Seperate Concern
