import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { NewsPage } from './pages/NewsPage'
import { AddNewsPage } from './pages/AddNewsPage'
import { CompetitionPage } from './pages/CompetitionPage'
import { ReportPage } from './pages/ReportPage'
import { ReportRequestPage } from './pages/ReportRequestPage'
import { AuthPage } from './pages/AuthPage'
import { RegisterPage } from './pages/RegisterPage'
import { SpecialRegisterPage } from './pages/SpecialRegisterPage'
import { CompetitionInfoPage } from './pages/CompetitionInfoPage'
import { StreamPage } from './pages/StreamPage'
import { ContactsPage } from './pages/ContactsPage'
import { AboutPage } from './pages/AboutPage'
import { ChangeNewsPage } from './pages/ChangeNewsPage'

export const useRoutes = (isAuthenticated, isOrganizer) => {
    if (isAuthenticated && isOrganizer){
        return (
            <Switch>
            <Route path="/news" exact>
                <NewsPage />
            </Route>
            <Route path="/change_news" exact>
                <ChangeNewsPage />
            </Route>
            <Route path="/about" exact>
                <AboutPage />
            </Route>
            <Route path="/add_news" exact>
                <AddNewsPage />
            </Route>
            <Route path="/stream/:id" exact>
                <StreamPage />
            </Route>
            <Route path="/contacts" exact>
                <ContactsPage />
            </Route>
            <Route path="/competition" exact>
                <CompetitionPage />
            </Route>
            <Route path="/report" exact>
                <ReportPage />
            </Route>
            <Route path="/report_request" exact>
                <ReportRequestPage />
            </Route>
            <Route path="/competition_info/:id" exact>
                <CompetitionInfoPage />
            </Route>
            <Redirect to="/news" />
        </Switch>    
        )
    }
    if (isAuthenticated && !isOrganizer) {
        return (
            <Switch>
            <Route path="/news" exact>
                <NewsPage />
            </Route>
            <Route path="/about" exact>
                <AboutPage />
            </Route>
            <Route path="/stream/:id" exact>
                <StreamPage />
            </Route>
            <Route path="/contacts" exact>
                <ContactsPage />
            </Route>
            <Route path="/competition_info/:id" exact>
                <CompetitionInfoPage />
            </Route>
            <Route path="/competition" exact>
                <CompetitionPage />
            </Route>
            <Route path="/report" exact>
                <ReportPage />
            </Route>
            <Route path="/report_request" exact>
                <ReportRequestPage />
            </Route>
            <Redirect to="/news" />
        </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/news" exact>
                <NewsPage />
            </Route>
            <Route path="/about" exact>
                <AboutPage />
            </Route>
            <Route path="/stream/:id" exact>
                <StreamPage />
            </Route>
            <Route path="/contacts" exact>
                <ContactsPage />
            </Route>
            <Route path="/competition_info/:id" exact>
                <CompetitionInfoPage />
            </Route>
        <Route path="/auth" exact>
            <AuthPage />
        </Route>
        <Route path="/register" exact>
            <RegisterPage />
        </Route>
        <Route path="/special_register" exact>
            <SpecialRegisterPage />
        </Route>
        <Route path="/report" exact>
                <ReportPage />
            </Route>
            <Route path="/report_request" exact>
                <ReportRequestPage />
            </Route>
            <Route path="/competition" exact>
                <CompetitionPage />
            </Route>
        <Redirect to="/news" />
    </Switch>
    )
}