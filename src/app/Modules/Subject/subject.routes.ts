import { Routes } from '@angular/router';
import { SubjectmainComponent } from './subjectmain/subjectmain.component';
import { ModulesComponent } from './modules/modules.component';
import { LessonComponent } from './lesson/lesson.component';
import { LearningmaterialsComponent } from './learningmaterials/learningmaterials.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { ProgressComponent } from './progress/progress.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { SubjecthomeComponent } from './subjecthome/subjecthome.component';
import { DiscussionlistComponent } from './discussionlist/discussionlist.component';
import { InputcheckersComponent } from './inputcheckers/inputcheckers.component';
import { AssessmentfinishComponent } from './assessmentfinish/assessmentfinish.component';

export const subjectRoute: Routes = [
    {path: "subjecthome", component: SubjecthomeComponent},
    {path: "subjectmain", component: SubjectmainComponent, 
        children: [
            {path: "subjects", component: SubjectsComponent},
            {path: "modules", component: ModulesComponent,
                children: [ 
                    {path: "learningmaterials", component: LearningmaterialsComponent},
                    {path: "lesson", component: LessonComponent},
                    {path: "assessment", component: AssessmentComponent},
                    {path: "progress", component: ProgressComponent},
                    {path: "discussion", component: DiscussionComponent},
                    {path: "questionnaires", component: QuestionnairesComponent},
                    {path: "discussionlist", component: DiscussionlistComponent},
                    {path: "inputcheckers", component: InputcheckersComponent},
                    {path: "assessmentfinish", component: AssessmentfinishComponent},
                    {path: "", redirectTo: "learningmaterials", pathMatch: "full"}
                ]
            },
        ]
    },
    {path: "", redirectTo: "subjecthome", pathMatch: "full"}
];