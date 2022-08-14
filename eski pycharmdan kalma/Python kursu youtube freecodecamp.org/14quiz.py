
question_prompts = [
    "What color are apples?\n(a) Red/Green\n(b) Purple\n(c) Orange\n\n",
    "What color are bananas?\n(a) Red/Green\n(b) Yellow\n(c) Orange\n\n"
]


class question:
    def __init__(self, prompt, answer):
        self.prompt = prompt
        self.answer = answer


questions = [
    question(question_prompts[0], "a"),
    question(question_prompts[1], "b")]


def exam(questions):
    puan = 0
    for question in questions:
        answer = input(question.prompt)
        if answer == question.answer:
            puan += 1
    print("Bu kadar puan aldın: {puan}/{qst}".format(puan=puan, qst=str(len(questions))))

exam(questions)