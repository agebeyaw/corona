import React from 'react';
import {
  StyledBody as StyledTableBody,
  StyledCell,
  StyledHead,
  StyledHeadCell,
  StyledRow,
  StyledTable
} from 'baseui/table';
import {Label3, Paragraph3, Paragraph4} from 'baseui/typography';
import {StyledLink} from 'baseui/link';
import {ProgressBar} from 'baseui/progress-bar';
import {useStyletron} from 'baseui';

export default function Recent({isLoading, data}) {
  const [, theme] = useStyletron();

  return (
    <>
      <Label3>Recent</Label3>
      <StyledTable
        $style={{
          borderColor: theme.colors.backgroundTertiary,
          marginTop: '12px',
          minHeight: '100px'
        }}
      >
        {isLoading && <ProgressBar
          infinite
          overrides={{
            Bar: {
              style: {
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
              },
            },
          }}/>}

        <StyledHead role="row">
          <StyledHeadCell role="columnheader">
            <Paragraph3 margin={0}>Date</Paragraph3>
          </StyledHeadCell>
          <StyledHeadCell role="columnheader">
            <Paragraph3 margin={0}>Number</Paragraph3>
          </StyledHeadCell>
          <StyledHeadCell role="columnheader">
            <Paragraph3 margin={0}>State</Paragraph3>
          </StyledHeadCell>
        </StyledHead>
        <StyledTableBody>
          {data && data.slice().reverse().map(({date, count, city, source}, index) => (
            <StyledRow key={index}>
              <StyledCell>
                <Paragraph4
                  margin={0}
                >
                  <StyledLink href={source} target="_blank">{date}</StyledLink>
                </Paragraph4>
              </StyledCell>
              <StyledCell>
                <Paragraph4
                  margin={0}
                >
                  {count}
                </Paragraph4>
              </StyledCell>
              <StyledCell>
                <Paragraph4
                  margin={0}
                >
                  {city || 'No Details'}
                </Paragraph4>
              </StyledCell>
            </StyledRow>
          ))}
        </StyledTableBody>
      </StyledTable>
    </>
  );
}