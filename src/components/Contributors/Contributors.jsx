import React from 'react';
import {Avatar} from 'baseui/avatar';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';


export default function Contributors() {
    return (
        <FlexGrid
            flexGridColumnCount={8}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
        >
            <FlexGridItem>
                <a
                    href="https://www.ambapu.org"
                    title="Amhara Professionals Union"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Avatar
                        name="APU"
                        src="/images/logo.png"
                    />
                </a>
            </FlexGridItem>
            <FlexGridItem>
                <a
                    href="https://www.wonfel.org"
                    title="Wonfel"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Avatar
                        name="APU"
                        src="/images/wonfel.jpg"
                    />
                </a>
            </FlexGridItem>
        </FlexGrid>
    );
}
