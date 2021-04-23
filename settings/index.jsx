function SettingsPage(props) {
    return (
        <Page>
            <Section
                title={<Text bold align="center">Time Format</Text>}>
                <Toggle
                    settingsKey="toggle"
                    label="Use 24 hour"
                />
            </Section>
        </Page>
    );
}

registerSettingsPage(SettingsPage);