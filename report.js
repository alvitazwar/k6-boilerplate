import { generateSummaryReport } from 'k6-html-reporter';

const options = {
        jsonFile: 'reports/',
        output: 'reports/',
    };

generateSummaryReport(options);