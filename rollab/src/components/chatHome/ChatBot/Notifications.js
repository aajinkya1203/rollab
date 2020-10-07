import React from 'react';

const Notifications = () => {
    return (
        <div id="notifi">
            <div id="notif-logs">
                <blockquote className="valign-wrapper groups-notif">
                    <span class="material-icons">
                        groups
                    </span>
                    This is a notification
                </blockquote>
                <blockquote className="valign-wrapper invi-notif">
                    <span class="material-icons">
                        insert_invitation
                    </span>
                    This is a notification
                </blockquote>
                <blockquote className="valign-wrapper notif-notif">
                    <span class="material-icons">
                        notification_important
                    </span>
                    youve been invited aot awd awd wad awd awd
                </blockquote>

            </div>
        </div>
    )
}

export default Notifications
