This is a simple PWA app that helps you track your expenditure.

To build your own (use this folder as root)
rm -R build; npm run build; aws s3 --profile personal cp build s3://shrmn-money-tracker --recursive --acl public-read