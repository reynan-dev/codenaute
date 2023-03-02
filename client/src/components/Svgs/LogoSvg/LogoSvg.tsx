import COLORS from 'styles/colors';

interface LogoSvgProps {
	className?: string;
	size?: string;
	color?: string;
	backgroundColor?: string;
}

export const LogoSvg = ({
	size = '100px',
	color = COLORS.PRIMARY.DEFAULT,
	backgroundColor = COLORS.PRIMARY[100]
}: LogoSvgProps) => {
	return (
		<div>
			<svg
				version='1.1'
				id='Layer_1'
				x='0px'
				y='0px'
				width={size}
				height={size}
				viewBox='0 0 1000 1000'
				enableBackground='new 0 0 1000 1000'
			>
				<path
					fill={backgroundColor}
					fillRule='evenodd'
					clipRule='evenodd'
					d='M131.667,328.333c60-76.667,181.333-168.667,252-176.667s190-35.333,262.667,0
	S809.667,280.333,849,334.333S910.334,385.666,903.667,485S894.333,618.333,859,673s-66,128-148,156.667s-148.666,76.667-254.667,50
	c-106-26.667-119.333,4-193.333-60s-108-75.333-137.333-165.333s-58-118.667-39.333-184S131.667,328.333,131.667,328.333z'
				/>
				<path
					fill={color}
					fillRule='evenodd'
					clipRule='evenodd'
					d='M494.585,914.021c-47.956,0.479-94.688-6.998-140.332-21.566
	c-32.945-10.516-64.232-24.689-93.845-42.555c-21.255-12.82-41.305-27.309-60.024-43.621
	c-28.462-24.801-53.293-52.795-74.142-84.297c-12.164-18.379-22.804-37.586-31.838-57.691c-2.145-4.771-1.024-3.738-6.062-5.186
	c-10.393-2.988-20.361-6.973-29.701-12.49c-19.633-11.6-33.635-28.037-42.249-49.09c-4.386-10.722-7.528-21.793-9.367-33.26
	c-2.551-15.924-4.157-31.932-4.702-48.042c-0.267-7.878-0.52-15.768-0.373-23.645c0.324-17.45,1.671-34.83,4.656-52.047
	c0.967-5.574,2.095-11.13,3.427-16.627c4.392-18.127,13.37-33.756,26.147-47.256c11.667-12.327,25.375-21.867,40.519-29.38
	c4.768-2.364,9.707-4.395,14.625-6.441c3.797-1.582,3.502-1.039,5.304-4.909c14.452-31.061,32.354-59.976,53.962-86.579
	c12.199-15.02,25.25-29.241,39.373-42.486c17.457-16.371,36.06-31.293,55.933-44.624c38.854-26.065,80.788-45.549,125.688-58.68
	c26.618-7.783,53.733-13.011,81.3-15.949c10.608-1.131,21.24-1.748,31.921-1.628c11.549,0.128,23.103,0.11,34.653,0.003
	c9.461-0.088,18.872,0.527,28.265,1.517c15.582,1.643,31.061,3.987,46.405,7.187c30.321,6.323,59.715,15.577,88.147,27.894
	c25.352,10.98,49.465,24.208,72.306,39.733c23.862,16.221,45.915,34.626,66.015,55.345c26.374,27.182,48.771,57.3,66.808,90.625
	c4.811,8.892,9.323,17.938,13.359,27.206c0.805,1.849,1.947,2.727,3.859,3.149c9.462,2.086,18.631,5.088,27.425,9.171
	c25.493,11.836,43.355,30.833,53.442,57.093c4.156,10.816,7.063,21.946,8.759,33.428c1.525,10.327,2.757,20.682,3.53,31.086
	c0.5,6.75,0.834,13.529,0.904,20.299c0.101,9.77,0.089,19.551-0.243,29.315c-0.243,7.093-1.029,14.17-1.667,21.245
	c-0.906,10.07-2.686,20.006-4.636,29.92c-4.984,25.332-17.947,45.877-37.467,62.451c-15.079,12.803-32.171,22.082-50.837,28.52
	c-0.629,0.217-1.278,0.387-1.891,0.639c-2.051,0.84-3.634,1.934-4.688,4.18c-15.404,32.867-34.893,63.129-58.285,90.887
	c-18.094,21.473-38.148,40.92-60.033,58.502c-24.865,19.973-51.642,36.934-80.168,51.158c-25.22,12.576-51.428,22.594-78.513,30.334
	c-21.182,6.053-42.714,10.459-64.539,13.385c-18.513,2.48-37.104,3.965-55.803,3.783
	C498.138,914.006,496.361,914.021,494.585,914.021z M500.341,155.161c-7.442,0-14.885-0.028-22.325,0.016
	c-2.776,0.016-5.568,0.026-8.318,0.333c-9.711,1.085-19.45,2.034-29.104,3.512c-31.218,4.783-61.35,13.469-90.42,25.816
	c-30.429,12.926-58.674,29.572-84.646,50.026c-26.07,20.532-48.943,44.177-68.369,71.093c-26.719,37.02-45.496,77.699-55.83,122.211
	c-4.203,18.104-6.938,36.433-7.847,55.003c-0.335,6.874-0.302,13.767-0.416,20.649c-0.257,15.254,1.003,30.399,3.191,45.485
	c5.753,39.669,18.417,77.023,37.771,112.092c22.683,41.1,52.735,75.975,89.625,104.928c38.494,30.215,81.487,51.609,128.592,64.76
	c27.817,7.766,56.165,12.287,85.022,13.582c2.546,0.117,5.104,0.205,7.525,1.199c0.498,0.203,1.085,0.271,1.629,0.264
	c2.428-0.041,4.88,0.307,7.259-0.586c0.702-0.266,1.53-0.217,2.304-0.248c5.327-0.23,10.65-0.461,15.977-0.654
	c18.686-0.682,37.19-2.949,55.537-6.48c42.705-8.219,82.888-23.205,120.418-45.215c34.69-20.346,65.292-45.631,91.547-76.123
	c28.884-33.549,50.689-71.182,65.036-113.092c10.726-31.326,16.554-63.558,17.677-96.643c0.518-15.233-0.227-30.419-1.879-45.566
	c-2.932-26.855-9.066-52.961-18.493-78.267c-19.486-52.32-50.295-96.958-91.628-134.386c-18.42-16.68-38.422-31.209-59.907-43.709
	c-31.815-18.51-65.663-31.894-101.436-40.459c-14.599-3.496-29.367-6.037-44.265-7.825c-9.377-1.125-18.77-1.977-28.239-1.742
	C511.005,155.269,505.669,155.16,500.341,155.161z'
				/>
				<path
					fill={color}
					fillRule='evenodd'
					clipRule='evenodd'
					d='M175.1,503.169c0.009-7.332,0.52-14.628,1.101-21.938
	c0.565-7.09,1.601-14.106,2.592-21.128c0.696-4.932,1.829-9.808,2.837-14.693c0.895-4.339,1.558-8.766,2.941-12.948
	c1.077-3.254,1.171-6.789,2.912-9.842c0.37-0.648,0.434-1.486,0.57-2.247c0.255-1.423,0.498-2.82,1.316-4.084
	c0.405-0.626,0.487-1.459,0.732-2.195c0.352-1.048,0.721-2.09,1.079-3.136c0.393-1.147,0.775-2.3,1.174-3.445
	c0.729-2.089,1.404-4.197,2.216-6.251c0.973-2.463,2.075-4.877,3.104-7.319c0.343-0.813,0.641-1.646,0.944-2.476
	c0.153-0.416,0.192-0.895,0.421-1.257c2.135-3.381,3.431-7.175,5.303-10.685c1.826-3.427,3.528-6.921,5.423-10.309
	c3.627-6.482,7.289-12.947,11.068-19.342c1.63-2.758,3.6-5.316,5.4-7.977c1.674-2.475,3.238-5.03,5.007-7.434
	c3.222-4.375,6.445-8.757,9.879-12.963c3.926-4.81,7.989-9.517,12.168-14.109c4.103-4.507,8.153-9.067,12.738-13.127
	c3.901-3.455,7.52-7.228,11.354-10.762c2.523-2.325,5.175-4.516,7.825-6.699c3.684-3.033,7.383-6.051,11.144-8.988
	c5.422-4.234,10.973-8.291,16.797-11.967c2.999-1.893,5.895-3.946,8.874-5.872c1.582-1.023,3.223-1.961,4.87-2.88
	c5.424-3.026,10.799-6.152,16.315-9.006c6.008-3.109,12.116-6.036,18.249-8.894c4.621-2.153,9.328-4.126,14.044-6.066
	c2.554-1.052,5.21-1.854,7.813-2.785c1.871-0.668,3.72-1.401,5.601-2.041c3.143-1.068,6.294-2.112,9.458-3.117
	c2.638-0.838,5.298-1.613,7.951-2.408c1.698-0.509,3.396-1.017,5.102-1.504c0.743-0.211,1.499-0.388,2.256-0.542
	c0.435-0.088,0.894-0.054,1.321-0.158c3.768-0.901,7.534-1.819,11.297-2.737c0.754-0.184,1.493-0.488,2.257-0.568
	c5.521-0.586,10.801-2.551,16.399-2.751c1.97-0.071,3.907-0.868,5.884-1.051c7.401-0.684,14.708-2.183,22.177-2.344
	c4.647-0.102,9.282-0.694,13.926-1.027c1.66-0.12,3.33-0.17,4.994-0.172c6.665-0.008,13.329-0.005,19.993,0.046
	c1.321,0.01,2.641,0.243,3.962,0.382c0.55,0.057,1.098,0.164,1.648,0.197c3.323,0.2,6.647,0.373,9.969,0.582
	c9.092,0.574,18.121,1.65,27.097,3.209c4.696,0.815,9.423,1.484,14.101,2.398c4.35,0.85,8.653,1.936,12.978,2.924
	c1.297,0.297,2.598,0.593,3.885,0.926c1.391,0.36,2.771,0.759,4.153,1.148c0.852,0.242,1.684,0.596,2.552,0.729
	c1.768,0.275,3.491,0.647,5.092,1.482c0.29,0.152,0.621,0.258,0.946,0.312c2.312,0.378,4.501,1.099,6.674,1.986
	c2.044,0.834,4.219,1.341,6.33,2.013c2.635,0.836,5.309,1.576,7.885,2.569c3.606,1.392,7.161,2.93,10.698,4.492
	c3.954,1.747,7.843,3.649,11.8,5.382c6.616,2.895,13.046,6.158,19.371,9.622c5.639,3.086,11.271,6.2,16.753,9.551
	c4.819,2.945,9.356,6.35,14.152,9.34c4.537,2.827,8.668,6.189,12.891,9.421c4.667,3.571,9.165,7.368,13.64,11.182
	c4.301,3.666,8.665,7.292,12.669,11.267c6.537,6.487,12.895,13.162,19.157,19.915c4.222,4.553,8.095,9.418,11.887,14.351
	c5.684,7.39,11.161,14.918,16.142,22.795c2.608,4.126,5.104,8.328,7.543,12.554c2.937,5.085,5.803,10.215,8.62,15.37
	c1.114,2.036,2.006,4.192,3.021,6.282c1.108,2.281,2.251,4.544,3.358,6.827c0.288,0.596,0.487,1.235,0.738,1.849
	c1.836,4.508,3.675,9.014,5.511,13.521c0.125,0.308,0.303,0.602,0.379,0.922c0.996,4.224,2.887,8.148,4.129,12.28
	c1.686,5.617,3.153,11.301,4.618,16.982c1.079,4.187,2.11,8.393,2.964,12.628c1.033,5.108,1.872,10.251,2.754,15.387
	c0.394,2.297,0.76,4.603,1.008,6.918c0.486,4.521,0.899,9.05,1.307,13.58c0.316,3.53,0.676,7.06,0.845,10.598
	c0.271,5.65,0.727,11.32,0.508,16.961c-0.313,8.079-0.761,16.158-1.84,24.199c-1.123,8.383-2.858,16.613-5.074,24.756
	c-0.899,3.313-1.798,6.635-2.876,9.893c-1.25,3.777-2.452,7.604-4.124,11.2c-1.763,3.791-2.832,7.913-5.292,11.376
	c-1.006,3.462-3.248,6.283-4.871,9.43c-2.442,4.742-5.282,9.236-8.434,13.536c-2.884,3.937-5.759,7.884-8.701,11.78
	c-3.881,5.143-8.209,9.91-12.667,14.551c-3.453,3.6-6.987,7.143-10.719,10.451c-4.313,3.816-8.772,7.49-13.367,10.965
	c-5.041,3.811-10.263,7.398-15.501,10.939c-2.653,1.791-5.493,3.313-8.301,4.867c-3.58,1.984-7.168,3.965-10.837,5.785
	c-2.771,1.373-5.668,2.496-8.513,3.723c-0.61,0.266-1.252,0.467-1.851,0.75c-6.025,2.863-12.28,5.105-18.666,7.008
	c-3.08,0.916-6.065,2.186-9.177,2.941c-4.2,1.02-8.333,2.279-12.561,3.227c-4.876,1.088-9.832,1.643-14.697,2.727
	c-1.939,0.432-3.938,0.631-5.922,0.816c-3.314,0.314-6.697,0.232-9.943,0.875c-3.646,0.721-7.269,0.707-10.924,0.738
	c-0.771,0.008-1.56,0.086-2.309,0.262c-2.289,0.539-4.605,0.662-6.945,0.662c-70.753-0.014-141.503-0.018-212.256-0.021
	c-3.443,0-6.889,0.094-10.329-0.021c-2.428-0.082-4.843-0.484-7.269-0.676c-1.548-0.125-3.105-0.117-4.656-0.184
	c-1.553-0.068-3.107-0.098-4.652-0.24c-4.09-0.377-8.178-0.783-12.26-1.219c-1.985-0.213-3.962-0.494-5.937-0.787
	c-3.18-0.475-6.358-0.965-9.532-1.48c-0.872-0.146-1.728-0.402-2.587-0.625c-0.749-0.197-1.478-0.525-2.239-0.621
	c-3.649-0.459-7.153-1.525-10.698-2.436c-3.862-0.992-7.653-2.189-11.403-3.537c-1.667-0.598-3.43-0.943-5.067-1.604
	c-5.957-2.408-11.932-4.781-17.802-7.391c-6.675-2.969-13.306-6.051-19.498-9.982c-0.746-0.473-1.574-0.816-2.363-1.223
	c-5.24-2.703-10.073-6.064-14.905-9.4c-3.552-2.453-6.832-5.303-10.206-8.01c-1.906-1.525-3.794-3.078-5.621-4.699
	c-3.4-3.016-6.992-5.865-10.066-9.188c-4.89-5.285-9.913-10.457-14.409-16.109c-6.021-7.564-11.542-15.463-16.56-23.725
	c-1.895-3.119-4.022-6.098-5.212-9.607c-0.276-0.814-1.025-1.454-1.41-2.246c-1.452-2.984-2.965-5.948-4.228-9.013
	c-1.77-4.294-3.384-8.658-4.972-13.026c-1.024-2.813-2.004-5.656-2.784-8.543c-1.501-5.566-3.112-11.125-4.187-16.777
	c-1.178-6.197-2.372-12.423-2.616-18.764c-0.013-0.332-0.008-0.668-0.051-0.998C174.756,518.486,175.172,510.821,175.1,503.169z
	 M335.886,494.432c4.013,0.113,7.993-0.052,11.88-1.196c0.106-0.031,0.218-0.05,0.328-0.06c6.131-0.546,11.928-2.419,17.658-4.516
	c1.763-0.645,3.485-1.428,5.171-2.257c3.678-1.813,7.574-3.21,10.978-5.549c4.388-3.014,8.743-6.077,13.054-9.198
	c1.61-1.166,3.127-2.48,4.565-3.852c2.643-2.525,5.3-5.048,7.764-7.744c3.437-3.763,6.884-7.542,9.982-11.578
	c2.824-3.678,5.456-7.518,7.853-11.527c4.228-7.072,7.841-14.398,10.737-22.116c2.971-7.919,5.364-15.992,6.533-24.355
	c0.811-5.809,1.058-11.698,1.576-17.548c0.269-3.023-0.529-5.951-0.731-8.927c-0.315-4.655-0.448-9.317-2.035-13.778
	c-0.11-0.308-0.072-0.664-0.156-0.985c-0.452-1.71-0.891-3.425-1.395-5.121c-0.284-0.956-0.756-1.854-1.022-2.813
	c-1.285-4.634-3.319-8.955-5.746-13.055c-4.845-8.191-10.867-15.337-18.753-20.87c-5.582-3.915-11.454-7.251-17.898-9.371
	c-4.394-1.445-8.9-2.621-13.604-2.939c-8.667-0.585-17.26-0.679-25.733,1.684c-2.553,0.711-5.132,1.27-7.667,2.112
	c-5.694,1.893-11.109,4.396-16.433,7.091c-8.152,4.128-15.449,9.552-22.369,15.476c-2.771,2.373-5.456,4.832-7.744,7.734
	c-2.325,2.95-5.119,5.533-7.413,8.503c-3.245,4.204-6.296,8.567-9.048,13.119c-3.899,6.449-7.191,13.215-10.275,20.084
	c-0.816,1.815-1.641,3.644-2.25,5.534c-1.019,3.162-1.861,6.378-2.79,9.567c-0.186,0.638-0.363,1.292-0.654,1.884
	c-0.701,1.424-0.976,2.932-1.111,4.495c-0.085,0.992-0.247,1.986-0.474,2.957c-0.963,4.109-1.806,8.229-1.656,12.487
	c0.027,0.773-0.08,1.554-0.172,2.325c-0.521,4.313-0.69,8.617,0.064,12.931c0.19,1.084,0.131,2.213,0.173,3.32
	c0.034,0.888-0.074,1.8,0.093,2.657c0.783,4.028,1.396,8.111,2.524,12.043c1.678,5.847,3.671,11.608,6.714,16.936
	c3.866,6.767,8.326,13.061,13.914,18.564c6.868,6.763,15.03,11.252,24.01,14.48c4.627,1.664,9.534,1.969,14.257,3.158
	c1.157,0.292,2.422,0.178,3.64,0.208C333.444,494.456,334.666,494.432,335.886,494.432z'
				/>
			</svg>
		</div>
	);
};
