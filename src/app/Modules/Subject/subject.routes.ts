import { Routes } from '@angular/router';
import { SubjectmainComponent } from './subjectmain/subjectmain.component';
import { ModulesComponent } from './modules/modules.component';
import { LessonComponent } from './lesson/lesson.component';
import { LearningmaterialsComponent } from './learningmaterials/learningmaterials.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { ProgressComponent } from './progress/progress.component';

export const subjectRoute: Routes = [
    {path: "subjectmain", component: SubjectmainComponent, 
        children: [
            {path: "modules", component: ModulesComponent,
                children: [
                    {path: "lesson", component: LessonComponent},
                    {path: "learningmaterials", component: LearningmaterialsComponent},
                    {path: "discussion", component: DiscussionComponent},
                    {path: "assessment", component: AssessmentComponent,
                        children: [
                            {path: "progress", component: ProgressComponent},
                            {path: "", redirectTo: "progress", pathMatch: "full"}
                        ]
                    },
                    {path: "", redirectTo: "lesson", pathMatch: "full"}
                ]
            },
            {path: "", redirectTo: "modules", pathMatch: "full"}
        ]
    },
    {path: "", redirectTo: "subjectmain", pathMatch: "full"}
];